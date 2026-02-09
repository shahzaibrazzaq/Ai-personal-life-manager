import pytest
from httpx import AsyncClient

@pytest.mark.anyio
async def test_root(client: AsyncClient):
    response = await client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to AI Personal Life Manager API"}

# Add more tests for Auth, etc. mock DB would be needed for full integration testing
