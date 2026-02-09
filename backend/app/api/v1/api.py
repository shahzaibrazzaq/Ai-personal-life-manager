from app.api.v1.endpoints import auth, chat, health, finance, study, travel, insight

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(finance.router, prefix="/finance", tags=["finance"])
api_router.include_router(study.router, prefix="/study", tags=["study"])
api_router.include_router(travel.router, prefix="/travel", tags=["travel"])
api_router.include_router(insight.router, prefix="/insight", tags=["insight"])
