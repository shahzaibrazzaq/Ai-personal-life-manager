import json
from langchain_core.messages import ToolMessage
from app.graph.tools import (
    calculate_bmi, get_nutrition_info,
    track_expense, get_investment_tips,
    generate_quiz, summarize_notes,
    search_flights, find_hotels
)

# Map string names to function objects
tool_map = {
    "calculate_bmi": calculate_bmi,
    "get_nutrition_info": get_nutrition_info,
    "track_expense": track_expense,
    "get_investment_tips": get_investment_tips,
    "generate_quiz": generate_quiz,
    "summarize_notes": summarize_notes,
    "search_flights": search_flights,
    "find_hotels": find_hotels
}

async def run_tool_loop(agent, state):
    """
    Executes the agent. If tool calls are generated, execute them and recurse.
    This mimics a ReAct loop inside a single node.
    """
    # Get the latest message or specific state if needed
    # For now, we pass the whole state to the agent chain
    result = await agent.ainvoke(state)
    
    # Check if the result is an AIMessage with tool_calls
    if not hasattr(result, "tool_calls") or not result.tool_calls:
        # No tools, just return content
        return result.content
        
    # Process tool calls
    messages = list(state.get("messages", []))
    # We add the AI message with tool calls to history
    # But wait, 'agent.ainvoke(state)' might return just a Message object, not appending to state automatically unless we do it.
    # In LangGraph, node returns dict of updates.
    
    # Let's perform the tool execution here and return the FINAL textual response to the supervisor
    # (Since Supervisor expects a string summary from the worker usually)
    
    current_msg = result
    
    # Execute tools
    tool_outputs = []
    for tool_call in current_msg.tool_calls:
        tool_name = tool_call["name"]
        tool_args = tool_call["args"]
        tool_id = tool_call["id"]
        
        if tool_name in tool_map:
            tool_func = tool_map[tool_name]
            # Invoke tool
            tool_output = tool_func.invoke(tool_args)
            tool_outputs.append(
                ToolMessage(content=str(tool_output), tool_call_id=tool_id)
            )
    
    # if we have outputs, we need to feed back to agent to get final answer
    if tool_outputs:
        # We need to construct a new list of messages for the agent to continue
        # state['messages'] + [current_msg] + tool_outputs
        new_messages = list(state["messages"]) + [current_msg] + tool_outputs
        
        # Invoke agent again with new history
        # We need to create a temporary state structure that matches what agent expects
        final_response = await agent.ainvoke({**state, "messages": new_messages})
        return final_response.content

    return current_msg.content
