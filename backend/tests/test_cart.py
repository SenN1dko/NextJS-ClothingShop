"""Тесты корзины."""

from httpx import AsyncClient


async def test_get_cart_requires_auth(client: AsyncClient) -> None:
    assert (await client.get("/api/v1/cart")).status_code == 401


async def test_empty_cart_for_new_user(auth_client: AsyncClient) -> None:
    response = await auth_client.get("/api/v1/cart")

    assert response.status_code == 200
    body = response.json()
    assert body["items"] == []
    assert body["total_price"] == "0.00"


async def test_add_item_to_cart(auth_client: AsyncClient, product) -> None:
    response = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 2, "size": "M"},
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["total_items"] == 2
    assert len(body["items"]) == 1
    assert body["items"][0]["size"] == "M"
    # 2 штуки по 59.90 = 119.80
    assert body["total_price"] == "119.80"


async def test_add_same_item_twice_increases_quantity(
    auth_client: AsyncClient,
    product,
) -> None:
    await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 1, "size": "M"},
    )
    response = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 2, "size": "M"},
    )

    body = response.json()
    assert len(body["items"]) == 1
    assert body["items"][0]["quantity"] == 3


async def test_add_different_sizes_creates_separate_items(
    auth_client: AsyncClient,
    product,
) -> None:
    await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 1, "size": "M"},
    )
    response = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 1, "size": "L"},
    )

    assert len(response.json()["items"]) == 2


async def test_add_item_rejects_unknown_size(
    auth_client: AsyncClient,
    product,
) -> None:
    response = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 1, "size": "XXXL"},
    )

    assert response.status_code == 400


async def test_add_item_rejects_exceeding_stock(
    auth_client: AsyncClient,
    product,
) -> None:
    # 50 укладывается в лимит схемы (до 99), но превышает остаток (10).
    response = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 50},
    )

    assert response.status_code == 409


async def test_add_item_rejects_quantity_above_schema_limit(
    auth_client: AsyncClient,
    product,
) -> None:
    response = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 500},
    )

    assert response.status_code == 422


async def test_update_and_remove_item(
    auth_client: AsyncClient,
    product,
) -> None:
    created = await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 1},
    )
    item_id = created.json()["items"][0]["id"]

    updated = await auth_client.patch(
        f"/api/v1/cart/items/{item_id}",
        json={"quantity": 4},
    )
    assert updated.json()["items"][0]["quantity"] == 4
    assert updated.json()["total_price"] == "239.60"

    removed = await auth_client.delete(f"/api/v1/cart/items/{item_id}")
    assert removed.json()["items"] == []


async def test_update_unknown_item_returns_404(
    auth_client: AsyncClient,
) -> None:
    response = await auth_client.patch(
        "/api/v1/cart/items/9999",
        json={"quantity": 2},
    )

    assert response.status_code == 404


async def test_clear_cart(auth_client: AsyncClient, product) -> None:
    await auth_client.post(
        "/api/v1/cart/items",
        json={"product_id": product.id, "quantity": 3},
    )

    response = await auth_client.delete("/api/v1/cart")

    assert response.json()["items"] == []
    assert response.json()["total_items"] == 0
