"""Схемы корзины."""

from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class CartItemCreate(BaseModel):
    """Добавление позиции в корзину."""

    product_id: int = Field(ge=1)
    quantity: int = Field(default=1, ge=1, le=99)
    size: str | None = Field(default=None, max_length=8)


class CartItemUpdate(BaseModel):
    """Изменение количества позиции."""

    quantity: int = Field(ge=1, le=99)


class CartItemRead(BaseModel):
    """Позиция корзины для чтения."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    product_name: str
    product_slug: str
    image_url: str
    size: str | None
    quantity: int
    unit_price: Decimal
    line_total: Decimal

    @classmethod
    def from_model(cls, item: object) -> "CartItemRead":
        """Собирает схему из ORM-объекта с вычисляемыми полями."""
        product = item.product
        unit_price: Decimal = item.unit_price
        quantity: int = item.quantity
        return cls(
            id=item.id,
            product_id=product.id,
            product_name=product.name,
            product_slug=product.slug,
            image_url=product.image_url,
            size=item.size,
            quantity=quantity,
            unit_price=unit_price,
            line_total=(unit_price * quantity).quantize(
                Decimal("0.01"),
            ),
        )


class CartRead(BaseModel):
    """Корзина для чтения."""

    items: list[CartItemRead]
    total_items: int
    total_price: Decimal

    @classmethod
    def from_model(cls, cart: object) -> "CartRead":
        items = [CartItemRead.from_model(item) for item in cart.items]
        total_price: Decimal = sum(
            (item.line_total for item in items),
            start=Decimal("0.00"),
        )
        return cls(
            items=items,
            total_items=sum(item.quantity for item in items),
            total_price=total_price.quantize(Decimal("0.01")),
        )
