from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.api import deps
from app.models.user import User
from app.graph.workflow import graph
from langchain_core.messages import HumanMessage

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default_thread"

class ChatResponse(BaseModel):
    response: str
    # active_agent: str

@router.post("/message", response_model=ChatResponse)
async def chat_with_agent(
    chat_request: ChatRequest,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    # Prepare inputs
    inputs = {
        "messages": [HumanMessage(content=chat_request.message)],
        "user_context": {"email": current_user.email, "preferences": current_user.preferences}
    }
    
    # Run graph
    # Depending on how langgraph runs, we might want to stream or invoke
    # For MVP, simple invoke
    try:
        result = await graph.ainvoke(inputs)
        # Extract last message from the chain
        messages = result.get("messages", [])
        last_message = messages[-1].content if messages else "No response"
        return ChatResponse(response=str(last_message))
        
    except Exception as e:
        print(f"Error running graph: {e}")
        return ChatResponse(response="I'm sorry, I encountered an error processing your request. Please try again.")

