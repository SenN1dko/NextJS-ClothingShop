"""Тесты регистрации, входа и работы с токенами."""

from httpx import AsyncClient


async def test_register_creates_user(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/users/register",
        json={
            "username": "newbie",
            "email": "newbie@example.com",
            "password": "secret123",
        },
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["username"] == "newbie"
    assert body["role"] == "user"
    # Хеш пароля не должен утекать в ответе.
    assert "hashed_password" not in body
    assert "password" not in body


async def test_register_rejects_duplicate_username(
    client: AsyncClient,
    user_factory,
) -> None:
    await user_factory(username="taken")

    response = await client.post(
        "/api/v1/users/register",
        json={
            "username": "taken",
            "email": "other@example.com",
            "password": "secret123",
        },
    )

    assert response.status_code == 409


async def test_register_rejects_weak_password(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/users/register",
        json={
            "username": "weak",
            "email": "weak@example.com",
            "password": "nodigits",
        },
    )

    assert response.status_code == 422


async def test_login_returns_token_pair(client: AsyncClient, user_factory) -> None:
    await user_factory(username="alice", password="pass1234")

    response = await client.post(
        "/api/v1/users/login",
        json={"username": "alice", "password": "pass1234"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["access_token"]
    assert body["refresh_token"]
    assert body["expires_in"] > 0


async def test_login_rejects_wrong_password(
    client: AsyncClient,
    user_factory,
) -> None:
    await user_factory(username="bob", password="pass1234")

    response = await client.post(
        "/api/v1/users/login",
        json={"username": "bob", "password": "wrong"},
    )

    assert response.status_code == 401


async def test_login_gives_same_error_for_unknown_user(
    client: AsyncClient,
    user_factory,
) -> None:
    await user_factory(username="real", password="pass1234")

    unknown = await client.post(
        "/api/v1/users/login",
        json={"username": "ghost", "password": "pass1234"},
    )
    wrong = await client.post(
        "/api/v1/users/login",
        json={"username": "real", "password": "nope"},
    )

    assert unknown.status_code == wrong.status_code == 401
    assert unknown.json()["detail"] == wrong.json()["detail"]


async def test_me_requires_token(client: AsyncClient) -> None:
    assert (await client.get("/api/v1/users/me")).status_code == 401


async def test_me_returns_current_user(auth_client: AsyncClient) -> None:
    response = await auth_client.get("/api/v1/users/me")

    assert response.status_code == 200
    assert response.json()["username"] == "tester"


async def test_me_rejects_refresh_token(client: AsyncClient, user_factory) -> None:
    account = await user_factory()
    tokens = (
        await client.post(
            "/api/v1/users/login",
            json={"username": account.username, "password": "pass1234"},
        )
    ).json()

    response = await client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {tokens['refresh_token']}"},
    )

    assert response.status_code == 401


async def test_refresh_issues_new_tokens(client: AsyncClient, user_factory) -> None:
    account = await user_factory()
    tokens = (
        await client.post(
            "/api/v1/users/login",
            json={"username": account.username, "password": "pass1234"},
        )
    ).json()

    response = await client.post(
        "/api/v1/users/refresh",
        headers={"X-Refresh-Token": tokens["refresh_token"]},
    )

    assert response.status_code == 200
    assert response.json()["access_token"]


async def test_refresh_rejects_garbage(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/users/refresh",
        headers={"X-Refresh-Token": "not-a-token"},
    )

    assert response.status_code == 401
