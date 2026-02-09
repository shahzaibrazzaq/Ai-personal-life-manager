import pytest
from httpx import AsyncClient
from app.main import app
from app.core.config import settings

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture(scope="module")
async def client():
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c
