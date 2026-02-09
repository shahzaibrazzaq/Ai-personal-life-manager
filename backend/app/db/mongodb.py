from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.activity import Activity, Goal
from app.models.chat import Conversation
from app.models.domain import HealthLog, FinanceLog, StudyLog, TravelLog, AgentOutput

async def init_db():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    
    # Initialize Beanie with the document models
    await init_beanie(
        database=client[settings.DATABASE_NAME], 
        document_models=[
            User, Activity, Goal, Conversation,
            HealthLog, FinanceLog, StudyLog, TravelLog, AgentOutput
        ]
    )
