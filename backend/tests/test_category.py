"""Тесты эндпоинтов категорий."""

from httpx import AsyncClient


async def test_list_categories_includes_counts(
    client: AsyncClient,
    product,
) -> None:
    response = await client.get("/api/v1/categories")

    assert response.status_code == 200
    body = response.json()
    assert len(body) == 1
    assert body[0]["slug"] == "men"
    assert body[0]["products_count"] == 1


async def test_create_category_requires_admin(client: AsyncClient) -> None:
    response = await client.post(
        "/api/v1/categories",
        json={"name": "Обувь"},
    )

    assert response.status_code == 401


async def test_create_category_generates_slug(
    admin_client: AsyncClient,
) -> None:
    response = await admin_client.post(
        "/api/v1/categories",
        json={"name": "Обувь"},
    )

    assert response.status_code == 201, response.text
    assert response.json()["slug"] == "obuv"


async def test_create_duplicate_slug_conflicts(admin_client: AsyncClient) -> None:
    await admin_client.post("/api/v1/categories", json={"name": "Обувь"})

    response = await admin_client.post(
        "/api/v1/categories",
        json={"name": "Обувь"},
    )

    assert response.status_code == 409


async def test_cannot_delete_category_with_products(
    admin_client: AsyncClient,
    category,
    product,
) -> None:
    response = await admin_client.delete(f"/api/v1/categories/{category.id}")

    assert response.status_code == 409


async def test_delete_empty_category(admin_client: AsyncClient) -> None:
    created = await admin_client.post(
        "/api/v1/categories",
        json={"name": "Аксессуары"},
    )
    category_id = created.json()["id"]

    response = await admin_client.delete(f"/api/v1/categories/{category_id}")

    assert response.status_code == 200
    assert response.json()["message"] == "Категория удалена"
