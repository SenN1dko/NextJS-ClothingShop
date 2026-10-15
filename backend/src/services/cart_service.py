"""Бизнес-логика корзины."""

from fastapi import HTTPException, status

from models.cart import Cart, CartItem
from repositories.cart import CartRepository
from repositories.product import ProductRepository
from schemas.cart import CartItemCreate, CartItemUpdate


class CartService:
    """Сценарии работы с корзиной."""

    def __init__(
        self,
        cart_repo: CartRepository,
        product_repo: ProductRepository,
    ) -> None:
        self.cart_repo = cart_repo
        self.product_repo = product_repo

    async def get_cart(self, user_id: int) -> Cart:
        cart: Cart = await self.cart_repo.get_or_create(user_id)
        loaded = await self.cart_repo.get_with_items(cart.id)
        return loaded or cart

    async def add_item(
        self,
        user_id: int,
        data: CartItemCreate,
    ) -> Cart:
        cart: Cart = await self.cart_repo.get_or_create(user_id)

        product = await self.product_repo.get_with_category(
            data.product_id,
        )
        if product is None:
            msg = "Товар не найден"
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg,
            )

        if not product.is_active:
            msg = "Товар недоступен"
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=msg,
            )

        if product.stock < data.quantity:
            msg = f"Недостаточно товара на складе: {product.stock}"
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=msg,
            )

        if data.size and product.sizes and data.size not in product.sizes:
            msg = f"Размер '{data.size}' недоступен"
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=msg,
            )

        existing: CartItem | None = next(
            (
                item
                for item in cart.items
                if item.product_id == data.product_id and item.size == data.size
            ),
            None,
        )

        if existing is not None:
            new_quantity: int = existing.quantity + data.quantity
            if new_quantity > product.stock:
                msg = f"Недостаточно товара на складе: {product.stock}"
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=msg,
                )
            existing.quantity = new_quantity
            self.cart_repo.session.add(existing)
        else:
            self.cart_repo.session.add(
                CartItem(
                    cart_id=cart.id,
                    product_id=product.id,
                    quantity=data.quantity,
                    unit_price=product.price,
                    size=data.size,
                ),
            )

        await self.cart_repo.session.flush()
        loaded = await self.cart_repo.get_with_items(cart.id)
        return loaded or cart

    async def update_item(
        self,
        user_id: int,
        item_id: int,
        data: CartItemUpdate,
    ) -> Cart:
        cart: Cart = await self.get_cart(user_id)

        item: CartItem | None = next(
            (i for i in cart.items if i.id == item_id),
            None,
        )
        if item is None:
            msg = "Позиция корзины не найдена"
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg,
            )

        product = await self.product_repo.get_with_category(
            item.product_id,
        )
        if product is not None and product.stock < data.quantity:
            msg = f"Недостаточно товара на складе: {product.stock}"
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=msg,
            )

        item.quantity = data.quantity
        await self.cart_repo.session.flush()

        loaded = await self.cart_repo.get_with_items(cart.id)
        return loaded or cart

    async def remove_item(
        self,
        user_id: int,
        item_id: int,
    ) -> Cart:
        cart: Cart = await self.get_cart(user_id)

        item: CartItem | None = next(
            (i for i in cart.items if i.id == item_id),
            None,
        )
        if item is None:
            msg = "Позиция корзины не найдена"
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg,
            )

        await self.cart_repo.session.delete(item)
        await self.cart_repo.session.flush()

        loaded = await self.cart_repo.get_with_items(cart.id)
        return loaded or cart

    async def clear(self, user_id: int) -> Cart:
        cart: Cart = await self.get_cart(user_id)

        for item in list(cart.items):
            await self.cart_repo.session.delete(item)
        await self.cart_repo.session.flush()

        loaded = await self.cart_repo.get_with_items(cart.id)
        return loaded or cart
