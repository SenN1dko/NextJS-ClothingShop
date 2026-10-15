"""Схемы товара."""

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from core.utils import slugify


def _to_slug(value: str) -> str:
    """Приводит строку к slug-виду."""
    return slugify(value)


class ProductBase(BaseModel):
    """Общие поля товара."""

    name: str = Field(min_length=1, max_length=128)
    description: str = Field(default="", max_length=5000)
    brand: str | None = Field(default=None, max_length=64)
    price: Decimal = Field(
        ge=0,
        max_digits=10,
        decimal_places=2,
        description="Цена в валюте магазина",
    )
    discount_percent: int | None = Field(
        default=None,
        ge=0,
        le=100,
    )
    image_url: str = Field(max_length=512)
    images: list[str] = Field(default_factory=list)
    sizes: list[str] = Field(default_factory=list)
    colors: list[str] = Field(default_factory=list)
    stock: int = Field(default=0, ge=0)
    category_id: int = Field(ge=1)

    @field_validator("name")
    @classmethod
    def _strip_name(cls, value: str) -> str:
        cleaned: str = value.strip()
        if not cleaned:
            msg = "name не может быть пустым"
            raise ValueError(msg)
        return cleaned


class ProductCreate(ProductBase):
    """Создание товара."""

    slug: str | None = Field(default=None, max_length=128)

    @field_validator("slug")
    @classmethod
    def _validate_slug(cls, value: str | None) -> str | None:
        if value is None:
            return None
        slug: str = _to_slug(value)
        if not slug:
            msg = "slug не может быть пустым"
            raise ValueError(msg)
        return slug

    def resolved_slug(self) -> str:
        """Возвращает явный slug или генерирует его из имени."""
        if self.slug:
            return self.slug
        slug: str = _to_slug(self.name)
        if not slug:
            msg = "Не удалось сгенерировать slug из имени"
            raise ValueError(msg)
        return slug


class ProductUpdate(BaseModel):
    """Частичное обновление товара."""

    model_config = ConfigDict(extra="forbid")

    name: str | None = Field(default=None, min_length=1, max_length=128)
    description: str | None = Field(default=None, max_length=5000)
    brand: str | None = Field(default=None, max_length=64)
    price: Decimal | None = Field(
        default=None,
        ge=0,
        max_digits=10,
        decimal_places=2,
    )
    discount_percent: int | None = Field(default=None, ge=0, le=100)
    image_url: str | None = Field(default=None, max_length=512)
    images: list[str] | None = None
    sizes: list[str] | None = None
    colors: list[str] | None = None
    stock: int | None = Field(default=None, ge=0)
    category_id: int | None = Field(default=None, ge=1)
    is_active: bool | None = None


class CategoryBrief(BaseModel):
    """Краткая категория для вложения в товар."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str


class ProductRead(ProductBase):
    """Товар для чтения."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    is_active: bool
    final_price: Decimal = Field(
        description="Цена с учётом скидки",
    )
    category: CategoryBrief | None = None
    created_at: datetime
    updated_at: datetime


# Обратная совместимость со старым именем.
ProductCard = ProductRead
