from typing import List, Optional
from pydantic import BaseModel, Field

# --- Health ---
class DietPlan(BaseModel):
    meal_type: str # Breakfast, Lunch, Dinner
    food_items: List[str]
    calories: int

class ExerciseRoutine(BaseModel):
    activity: str
    duration_minutes: int
    frequency_per_week: int

class HealthAdvice(BaseModel):
    analysis: str
    diet_plan: Optional[List[DietPlan]] = None
    exercise_plan: Optional[List[ExerciseRoutine]] = None
    sleep_tips: Optional[List[str]] = None

# --- Finance ---
class BudgetRecommendation(BaseModel):
    category: str
    suggested_limit: float
    reason: str

class FinancialAdvice(BaseModel):
    analysis: str
    savings_tips: List[str]
    budget_adjustments: List[BudgetRecommendation]

# --- Study ---
class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    correct_answer: str

class StudyPlan(BaseModel):
    subject: str
    topics: List[str]
    schedule: List[str] # e.g. "Monday 10am: Math"

class StudyAssistance(BaseModel):
    summary: Optional[str] = None
    quiz: Optional[List[QuizQuestion]] = None
    study_plan: Optional[StudyPlan] = None

# --- Travel ---
class FlightOption(BaseModel):
    airline: str
    price: float
    departure_time: str

class HotelOption(BaseModel):
    name: str
    price_per_night: float
    rating: float

class DailyItinerary(BaseModel):
    day: int
    activities: List[str]

class TripPlan(BaseModel):
    destination: str
    estimated_cost: float
    flights: List[FlightOption]
    hotels: List[HotelOption]
    itinerary: List[DailyItinerary]
