from typing import TypedDict, Annotated, Sequence, Union
from langchain_core.messages import BaseMessage
import operator

class AgentState(TypedDict):
    # The list of messages in the conversation
    messages: Annotated[Sequence[BaseMessage], operator.add]
    # The next agent to act
    next: str
    # Context data (user profile, preferences, etc)
    user_context: dict
    # Shared insights for chained reasoning
    insights: Annotated[Sequence[str], operator.add]
    
