from typing import List
from fastapi import APIRouter, Depends
from app.api import deps
from app.models.user import User
from app.models.domain import TravelLog
from app.schemas.domain import TravelLogCreate, TravelLogOut

router = APIRouter()

@router.post("/", response_model=TravelLogOut)
async def create_travel_log(
    log_in: TravelLogCreate,
    current_user: User = Depends(deps.get_current_user)
):
    log = TravelLog(
        user_email=current_user.email,
        destination=log_in.destination,
        start_date=log_in.start_date,
        end_date=log_in.end_date,
        budget=log_in.budget,
        itinerary=log_in.itinerary
    )
    await log.create()
    return TravelLogOut(
        id=str(log.id),
        created_at=log.created_at,
        user_email=log.user_email,
        destination=log.destination,
        start_date=log.start_date,
        end_date=log.end_date,
        budget=log.budget,
        itinerary=log.itinerary
    )

@router.get("/", response_model=List[TravelLogOut])
async def read_travel_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_user)
):
    logs = await TravelLog.find(TravelLog.user_email == current_user.email).skip(skip).limit(limit).to_list()
    return [
        TravelLogOut(
            id=str(log.id),
            created_at=log.created_at,
            user_email=log.user_email,
            destination=log.destination,
            start_date=log.start_date,
            end_date=log.end_date,
            budget=log.budget,
            itinerary=log.itinerary
        ) for log in logs
    ]
