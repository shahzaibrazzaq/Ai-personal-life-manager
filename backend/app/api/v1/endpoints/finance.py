from typing import List
from fastapi import APIRouter, Depends
from app.api import deps
from app.models.user import User
from app.models.domain import FinanceLog
from app.schemas.domain import FinanceLogCreate, FinanceLogOut

router = APIRouter()

@router.post("/", response_model=FinanceLogOut)
async def create_finance_log(
    log_in: FinanceLogCreate,
    current_user: User = Depends(deps.get_current_user)
):
    log = FinanceLog(
        user_email=current_user.email,
        amount=log_in.amount,
        category=log_in.category,
        description=log_in.description,
        is_expense=log_in.is_expense
    )
    await log.create()
    return FinanceLogOut(
        id=str(log.id),
        timestamp=log.timestamp,
        user_email=log.user_email,
        amount=log.amount,
        category=log.category,
        description=log.description,
        is_expense=log.is_expense
    )

@router.get("/", response_model=List[FinanceLogOut])
async def read_finance_logs(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_user)
):
    logs = await FinanceLog.find(FinanceLog.user_email == current_user.email).skip(skip).limit(limit).to_list()
    return [
        FinanceLogOut(
            id=str(log.id),
            timestamp=log.timestamp,
            user_email=log.user_email,
            amount=log.amount,
            category=log.category,
            description=log.description,
            is_expense=log.is_expense
        ) for log in logs
    ]
