from datetime import datetime
from typing import Optional
from beanie import Document
from pydantic import Field
from enum import Enum

class Domain(str, Enum):
    HEALTH = "heatlh"
    FINANCE = "finance"
    STUDY = "study"
    TRAVEL = "travel"
    GENERAL = "general"

class Activity(Document):
    user_email: str
    domain: Domain
    title: str
    description: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    data: dict = {} # Structured data specific to the domain

    class Settings:
        name = "activities"

class Goal(Document):
    user_email: str
    domain: Domain
    title: str
    target_date: Optional[datetime] = None
    is_completed: bool = False
    progress: int = 0 # 0-100
    
    class Settings:
        name = "goals"
