from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.models.user import User
from app.models.domain import HealthLog
from app.schemas.domain import HealthLogCreate, HealthLogOut

router = APIRouter()

@router.post("/", response_model=HealthLogOut)
async def create_health_log(
    log_in: HealthLogCreate,
    current_user: User = Depends(deps.get_current_user)
):
    log = HealthLog(
        user_email=current_user.email,
        type=log_in.type,
        details=log_in.details
    )
    await log.create()
    return HealthLogOut(
        id=str(log.id),
        timestamp=log.timestamp,
        user_email=log.user_email,
        type=log.type,
        details=log.details
    )

@router.get("/", response_model=List[HealthLogOut])
async def read_health_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_user)
):
    logs = await HealthLog.find(HealthLog.user_email == current_user.email).skip(skip).limit(limit).to_list()
    return [
        HealthLogOut(
            id=str(log.id),
            timestamp=log.timestamp,
            user_email=log.user_email,
            type=log.type,
            details=log.details
        ) for log in logs
    ]
