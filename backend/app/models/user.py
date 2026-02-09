from datetime import datetime
from typing import Optional
from beanie import Document
from pydantic import EmailStr, Field

class User(Document):
    email: EmailStr = Field(unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Preferences / Profile for Agents
    # e.g., "Health: Vegan", "Finance: Conservative"
    preferences: dict = {} 

    class Settings:
        name = "users"
