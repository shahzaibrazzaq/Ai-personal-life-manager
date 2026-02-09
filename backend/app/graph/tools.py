from langchain_core.tools import tool
import random

# --- Health Tools ---
@tool
def calculate_bmi(height_cm: float, weight_kg: float) -> str:
    """Calculates BMI given height in cm and weight in kg."""
    bmi = weight_kg / ((height_cm / 100) ** 2)
    return f"BMI is {bmi:.2f}"

@tool
def get_nutrition_info(food_item: str) -> str:
    """Gets nutritional info for a food item."""
    # Mock data
    return f"{food_item}: 200 calories, 10g protein (Mock Data)"

# --- Finance Tools ---
@tool
def track_expense(amount: float, category: str, description: str) -> str:
    """Logs an expense."""
    # In a real app, this would call the DB or the CRUD service
    return f"Logged expense: ${amount} for {category} ({description})"

@tool
def get_investment_tips(risk_level: str) -> str:
    """Gets investment tips based on risk level (low, medium, high)."""
    tips = {
        "low": "Government bonds, High-yield savings",
        "medium": "Index funds, Blue-chip stocks",
        "high": "Crypto, Growth stocks"
    }
    return tips.get(risk_level.lower(), "Diversify your portfolio.")

# --- Study Tools ---
@tool
def generate_quiz(topic: str, num_questions: int = 3) -> str:
    """Generates a quiz for a topic."""
    return f"Generated {num_questions} questions for {topic}. (Mock Quiz)"

@tool
def summarize_notes(content: str) -> str:
    """Summarizes study notes."""
    return f"Summary: {content[:50]}... (Condensed)"

# --- Travel Tools ---
@tool
def search_flights(origin: str, destination: str) -> str:
    """Searches for flights."""
    price = random.randint(300, 1000)
    return f"Flight from {origin} to {destination}: ${price} on United Airlines."

@tool
def find_hotels(destination: str, budget_per_night: float) -> str:
    """Finds hotels within budget."""
    return f"Hotel in {destination}: 'City Central', ${budget_per_night - 10}/night."
