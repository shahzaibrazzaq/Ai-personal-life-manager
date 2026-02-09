import functools
import operator
from typing import Literal

from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END

from app.graph.state import AgentState
from app.graph.agents import health_agent, finance_agent, study_agent, travel_agent, llm
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import JsonOutputFunctionsParser

# System prompt for the supervisor
members = ["Health_Agent", "Finance_Agent", "Study_Agent", "Travel_Agent"]
system_prompt = (
    "You are a supervisor tasked with managing a conversation between the"
    " following workers: {members}. Given the following user request and conversation history,"
    " respond with the worker to act next. Each worker will perform a"
    " task and respond with their results."
    "\n\nIMPORTANT: Support chained reasoning. If one agent uncovers an issue that affects another domain,"
    " route the conversation to the relevant agent. "
    "For example: 'Finance' detects overspending -> Route to 'Health' to adjust diet cost -> Route to 'Study' if it affects stress."
    " Do not finish until all implications have been addressed."
    " When finished, respond with FINISH."
)

options = ["FINISH"] + members

# Using function calling for structured routing
function_def = {
    "name": "route",
    "description": "Select the next role.",
    "parameters": {
        "title": "routeSchema",
        "type": "object",
        "properties": {
            "next": {
                "title": "Next",
                "anyOf": [
                    {"enum": options},
                ],
            }
        },
        "required": ["next"],
    },
}

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="messages"),
        (
            "system",
            "Given the conversation above, who should act next?"
            " Or should we FINISH? Select one of: {options}",
        ),
    ]
).partial(options=str(options), members=", ".join(members))

supervisor_chain = (
    prompt
    | llm.bind_functions(functions=[function_def], function_call="route")
    | JsonOutputFunctionsParser()
)

from app.graph.tool_loop import run_tool_loop

# Nodes for the graph
async def supervisor_node(state):
    result = await supervisor_chain.ainvoke(state)
    return result

async def agent_node(agent, name, state):
    # Use the helper to run the agent with potential tool usage
    result_content = await run_tool_loop(agent, state)
    return {"messages": [HumanMessage(content=result_content, name=name)]}

# Wrap agents into nodes
health_node = functools.partial(agent_node, health_agent, "Health_Agent")
finance_node = functools.partial(agent_node, finance_agent, "Finance_Agent")
study_node = functools.partial(agent_node, study_agent, "Study_Agent")
travel_node = functools.partial(agent_node, travel_agent, "Travel_Agent")

# Build the Graph
workflow = StateGraph(AgentState)
workflow.add_node("Supervisor", supervisor_node)
workflow.add_node("Health_Agent", health_node)
workflow.add_node("Finance_Agent", finance_node)
workflow.add_node("Study_Agent", study_node)
workflow.add_node("Travel_Agent", travel_node)

# Edges
for member in members:
    workflow.add_edge(member, "Supervisor")

# Conditional Edges from Supervisor
workflow.add_conditional_edges(
    "Supervisor",
    lambda x: x["next"],
    {
        "Health_Agent": "Health_Agent",
        "Finance_Agent": "Finance_Agent",
        "Study_Agent": "Study_Agent",
        "Travel_Agent": "Travel_Agent",
        "FINISH": END
    }
)

workflow.set_entry_point("Supervisor")
graph = workflow.compile()
