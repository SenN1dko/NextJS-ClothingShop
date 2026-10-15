"""Репозиторий корзин."""

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from models.cart import Cart, CartItem
from repositories.base import BaseRepository


class CartRepository(BaseRepository[Cart]):
    """Доступ к таблице `cart`."""

    model = Cart

    def _with_items_query(self):
        # populate_existing заставляет перечитать уже загруженную
        # коллекцию items: без неё identity map вернёт тот же объект
        # Cart с устаревшим (пустым) списком позиций.
        return (
            select(Cart)
            .options(selectinload(Cart.items).selectinload(CartItem.product))
            .execution_options(populate_existing=True)
        )

    async def get_by_user(self, user_id: int) -> Cart | None:
        result = await self.session.execute(
            self._with_items_query().where(Cart.user_id == user_id),
        )
        return result.unique().scalar_one_or_none()

    async def get_with_items(self, cart_id: int) -> Cart | None:
        result = await self.session.execute(
            self._with_items_query().where(Cart.id == cart_id),
        )
        return result.unique().scalar_one_or_none()

    async def get_or_create(self, user_id: int) -> Cart:
        """Возвращает корзину пользователя, создавая её при нужде."""
        cart = await self.get_by_user(user_id)
        if cart is not None:
            return cart
        cart = Cart(user_id=user_id)
        self.session.add(cart)
        await self.session.flush()
        await self.session.refresh(cart)
        return cart
