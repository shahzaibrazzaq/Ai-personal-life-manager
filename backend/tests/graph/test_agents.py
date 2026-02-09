import pytest
from app.graph.tools import calculate_bmi, get_nutrition_info

def test_calculate_bmi():
    result = calculate_bmi.invoke({"height_cm": 180, "weight_kg": 80})
    assert "BMI is" in result
    assert "24.69" in result

def test_nutrition_info():
    result = get_nutrition_info.invoke({"food_item": "Apple"})
    assert "Apple" in result
    assert "calories" in result
