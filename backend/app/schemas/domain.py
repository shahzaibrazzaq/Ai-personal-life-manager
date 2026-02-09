from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

# --- Health ---
class HealthLogCreate(BaseModel):
    type: str
    details: Dict[str, Any]

class HealthLogOut(HealthLogCreate):
    id: str
    timestamp: datetime
    user_email: str

# --- Finance ---
class FinanceLogCreate(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    is_expense: bool = True

class FinanceLogOut(FinanceLogCreate):
    id: str
    timestamp: datetime
    user_email: str

# --- Study ---
class StudyLogCreate(BaseModel):
    subject: str
    content: str
    tags: List[str] = []

class StudyLogOut(StudyLogCreate):
    id: str
    timestamp: datetime
    user_email: str

# --- Travel ---
class TravelLogCreate(BaseModel):
    destination: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    budget: Optional[float] = None
    itinerary: List[Dict[str, Any]] = []

class TravelLogOut(TravelLogCreate):
    id: str
    created_at: datetime
    user_email: str
