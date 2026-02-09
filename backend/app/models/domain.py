from datetime import datetime
from typing import Optional, List, Any
from beanie import Document
from pydantic import Field, BaseModel
from enum import Enum

# --- Shared ---
class LogType(str, Enum):
    # Health
    DIET = "diet"
    EXERCISE = "exercise"
    SLEEP = "sleep"
    # Finance
    EXPENSE = "expense"
    INCOME = "income"
    BUDGET = "budget"
    # Study
    NOTE = "note"
    QUIZ = "quiz"
    PLAN = "plan"
    # Travel
    TRIP = "trip"
    ITINERARY = "itinerary"

class BaseLog(Document):
    user_email: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    log_type: LogType
    data: dict = {} # Flexible payload (e.g., calories, amount, note content)
    
    class Settings:
        name = "logs" # Polymorphic collection could be used, or separate.
                      # For simplicity given the request asked for distinct collections, 
                      # we'll make distinct classes.

# --- Health ---
class HealthLog(Document):
    user_email: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    type: str # diet, exercise, sleep
    details: dict # e.g. {calories: 500, food: "salad"}
    
    class Settings:
        name = "health_logs"

# --- Finance ---
class FinanceLog(Document):
    user_email: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    amount: float
    category: str
    description: Optional[str] = None
    is_expense: bool = True
    
    class Settings:
        name = "finance_logs"

# --- Study ---
class StudyLog(Document):
    user_email: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    subject: str
    content: str # content of note or summary
    tags: List[str] = []
    
    class Settings:
        name = "study_logs"

# --- Travel ---
class TravelLog(Document):
    user_email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    destination: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    budget: Optional[float] = None
    itinerary: List[dict] = []
    
    class Settings:
        name = "travel_logs"

# --- Agent Outputs ---
class AgentOutput(Document):
    user_email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    agent_name: str # e.g. "Health_Agent", "Cross_Domain_Insight"
    content: dict # Structured output from agent
    
    class Settings:
        name = "agent_outputs"
