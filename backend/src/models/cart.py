"""Модели корзины и позиций корзины."""

from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.db.base import Base

if TYPE_CHECKING:
    from models.product import Product
    from models.user import User


class Cart(Base):
    """Корзина пользователя (одна активная корзина на пользователя)."""

    __tablename__ = "cart"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE"),
        unique=True,
        index=True,
        nullable=False,
    )
    user: Mapped["User"] = relationship(back_populates="cart")

    items: Mapped[list["CartItem"]] = relationship(
        back_populates="cart",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


class CartItem(Base):
    """Позиция корзины: товар + выбранный размер и количество."""

    __tablename__ = "cart_item"
    __table_args__ = (
        UniqueConstraint(
            "cart_id",
            "product_id",
            "size",
            name="uq_cart_id_product_id_size",
        ),
    )

    cart_id: Mapped[int] = mapped_column(
        ForeignKey("cart.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    product_id: Mapped[int] = mapped_column(
        ForeignKey("product.id", ondelete="CASCADE"),
        nullable=False,
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        default=1,
        server_default="1",
        nullable=False,
    )
    # Цена фиксируется на момент добавления, чтобы не зависеть
    # от последующих изменений цены товара.
    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    size: Mapped[str | None] = mapped_column(String(8))

    cart: Mapped["Cart"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(back_populates="cart_items")
