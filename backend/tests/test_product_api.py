"""Тесты эндпоинтов товаров."""

from decimal import Decimal

from httpx import AsyncClient


async def test_list_products_empty(client: AsyncClient) -> None:
    response = await client.get("/api/v1/products")

    assert response.status_code == 200
    body = response.json()
    assert body["items"] == []
    assert body["meta"]["total"] == 0


async def test_list_products_pagination(
    client: AsyncClient,
    product,
) -> None:
    response = await client.get("/api/v1/products?limit=10&offset=0")

    assert response.status_code == 200
    body = response.json()
    assert body["meta"]["total"] == 1
    assert len(body["items"]) == 1
    assert body["meta"]["has_more"] is False


async def test_final_price_applies_discount(
    client: AsyncClient,
    product,
) -> None:
    response = await client.get(f"/api/v1/products/{product.id}")

    assert response.status_code == 200
    body = response.json()
    assert Decimal(body["price"]) == Decimal("59.90")
    # 59.90 минус 10% = 53.91
    assert Decimal(body["final_price"]) == Decimal("53.91")
    assert body["slug"] == "hoodie-oversize"
    assert body["category"]["slug"] == "men"


async def test_get_missing_product_returns_404(
    client: AsyncClient,
    product,
) -> None:
    response = await client.get("/api/v1/products/999999")

    assert response.status_code == 404


async def test_filter_by_category_slug(
    client: AsyncClient,
    product,
    category,
) -> None:
    found = await client.get("/api/v1/products?category=men")
    missing = await client.get("/api/v1/products?category=women")

    assert found.json()["meta"]["total"] == 1
    assert missing.json()["meta"]["total"] == 0


async def test_search_is_case_insensitive(
    client: AsyncClient,
    product,
) -> None:
    response = await client.get("/api/v1/products?search=OVERSIZE")

    assert response.json()["meta"]["total"] == 1


async def test_price_range_filter(client: AsyncClient, product) -> None:
    inside = await client.get("/api/v1/products?min_price=50&max_price=60")
    outside = await client.get("/api/v1/products?min_price=1&max_price=10")

    assert inside.json()["meta"]["total"] == 1
    assert outside.json()["meta"]["total"] == 0


async def test_create_product_requires_auth(
    client: AsyncClient,
    category,
) -> None:
    response = await client.post(
        "/api/v1/products",
        json={
            "name": "Тест",
            "price": "10.00",
            "image_url": "https://example.com/a.jpg",
            "category_id": category.id,
        },
    )

    assert response.status_code == 401


async def test_create_product_forbidden_for_user(
    client: AsyncClient,
    category,
    user_factory,
) -> None:
    account = await user_factory()
    tokens = (
        await client.post(
            "/api/v1/users/login",
            json={
                "username": account.username,
                "password": "pass1234",
            },
        )
    ).json()

    response = await client.post(
        "/api/v1/products",
        json={
            "name": "Тест",
            "price": "10.00",
            "image_url": "https://example.com/a.jpg",
            "category_id": category.id,
        },
        headers={"Authorization": f"Bearer {tokens['access_token']}"},
    )

    assert response.status_code == 403


async def test_create_product_generates_slug(
    admin_client: AsyncClient,
    category,
) -> None:
    response = await admin_client.post(
        "/api/v1/products",
        json={
            "name": "Новый Худи",
            "price": "25.00",
            "image_url": "https://example.com/b.jpg",
            "category_id": category.id,
        },
    )

    assert response.status_code == 201, response.text
    assert response.json()["slug"] == "novyy-hudi"


async def test_create_product_rejects_negative_price(
    admin_client: AsyncClient,
    category,
) -> None:
    response = await admin_client.post(
        "/api/v1/products",
        json={
            "name": "Плохой",
            "price": "-5",
            "image_url": "https://example.com/c.jpg",
            "category_id": category.id,
        },
    )

    assert response.status_code == 422


async def test_create_product_rejects_unknown_category(
    admin_client: AsyncClient,
) -> None:
    response = await admin_client.post(
        "/api/v1/products",
        json={
            "name": "Без категории",
            "price": "10.00",
            "image_url": "https://example.com/d.jpg",
            "category_id": 4242,
        },
    )

    assert response.status_code == 400
