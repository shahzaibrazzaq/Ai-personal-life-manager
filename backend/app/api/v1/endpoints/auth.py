from datetime import col
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.api import deps
from app.core import security
from app.models.user import User
from app.schemas.user import UserCreate, UserOut, Token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = await User.find_one(User.email == form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    access_token = security.create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model=UserOut)
async def create_user_signup(user_in: UserCreate) -> Any:
    user = await User.find_one(User.email == user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )
        
    user = User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
    )
    await user.create()
    return UserOut(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        is_superuser=user.is_superuser
    )

@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: User = Depends(deps.get_current_user)) -> Any:
    return UserOut(
        id=str(current_user.id),
        email=current_user.email,
        full_name=current_user.full_name,
        is_active=current_user.is_active,
        is_superuser=current_user.is_superuser
    )
