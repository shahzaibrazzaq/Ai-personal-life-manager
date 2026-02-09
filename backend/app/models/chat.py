from datetime import datetime
from typing import List, Optional
from beanie import Document
from pydantic import BaseModel, Field

class Message(BaseModel):
    role: str # "user", "assistant", "system"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Conversation(Document):
    user_email: str
    title: Optional[str] = None
    messages: List[Message] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "conversations"
