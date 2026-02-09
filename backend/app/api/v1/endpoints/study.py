from typing import List
from fastapi import APIRouter, Depends
from app.api import deps
from app.models.user import User
from app.models.domain import StudyLog
from app.schemas.domain import StudyLogCreate, StudyLogOut

router = APIRouter()

@router.post("/", response_model=StudyLogOut)
async def create_study_log(
    log_in: StudyLogCreate,
    current_user: User = Depends(deps.get_current_user)
):
    log = StudyLog(
        user_email=current_user.email,
        subject=log_in.subject,
        content=log_in.content,
        tags=log_in.tags
    )
    await log.create()
    return StudyLogOut(
        id=str(log.id),
        timestamp=log.timestamp,
        user_email=log.user_email,
        subject=log.subject,
        content=log.content,
        tags=log.tags
    )

@router.get("/", response_model=List[StudyLogOut])
async def read_study_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_user)
):
    logs = await StudyLog.find(StudyLog.user_email == current_user.email).skip(skip).limit(limit).to_list()
    return [
        StudyLogOut(
            id=str(log.id),
            timestamp=log.timestamp,
            user_email=log.user_email,
            subject=log.subject,
            content=log.content,
            tags=log.tags
        ) for log in logs
    ]
