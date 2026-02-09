from typing import Any
from fastapi import APIRouter, Depends
from app.api import deps
from app.models.user import User
from app.models.domain import HealthLog, FinanceLog, StudyLog, TravelLog, AgentOutput
from app.graph.agents import llm
from langchain_core.messages import SystemMessage, HumanMessage

router = APIRouter()

@router.post("/generate", response_model=dict)
async def generate_cross_domain_insight(
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    # 1. Fetch recent data (e.g., last 5 entries from each)
    health_logs = await HealthLog.find(HealthLog.user_email == current_user.email).sort(-HealthLog.timestamp).limit(5).to_list()
    finance_logs = await FinanceLog.find(FinanceLog.user_email == current_user.email).sort(-FinanceLog.timestamp).limit(5).to_list()
    study_logs = await StudyLog.find(StudyLog.user_email == current_user.email).sort(-StudyLog.timestamp).limit(5).to_list()
    travel_logs = await TravelLog.find(TravelLog.user_email == current_user.email).sort(-TravelLog.created_at).limit(5).to_list()

    # 2. Construct context
    context = f"User: {current_user.full_name}\n\n"
    context += "Recent Health Logs:\n" + "\n".join([str(l.model_dump()) for l in health_logs]) + "\n\n"
    context += "Recent Finance Logs:\n" + "\n".join([str(l.model_dump()) for l in finance_logs]) + "\n\n"
    context += "Recent Study Logs:\n" + "\n".join([str(l.model_dump()) for l in study_logs]) + "\n\n"
    context += "Recent Travel Logs:\n" + "\n".join([str(l.model_dump()) for l in travel_logs]) + "\n\n"

    # 3. Call LLM
    prompt = (
        "You are a holistic life coach AI. Analyze the user's recent data across Health, Finance, Study, and Travel. "
        "Find correlations and provide 3 actionable insights. For example, if they are spending too much on food (Finance) maybe it affects their diet (Health). "
        "Or if they have exams coming up (Study), maybe they should pause travel plans."
        "Return the response as a JSON object with a key 'insights' which is a list of strings."
    )
    
    messages = [
        SystemMessage(content=prompt),
        HumanMessage(content=context)
    ]
    
    # Simple invoke (can be improved with structured output later)
    response = llm.invoke(messages)
    content = response.content

    # 4. Store result
    # For now, we store raw content. In a real app, parse JSON.
    insight_log = AgentOutput(
        user_email=current_user.email,
        agent_name="Cross_Domain_Insight",
        content={"raw_output": content}
    )
    await insight_log.create()

    return {"insight": content}
