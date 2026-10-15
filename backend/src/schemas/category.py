"""Схемы категории."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

from core.utils import slugify


def _to_slug(value: str) -> str:
    return slugify(value)


class CategoryBase(BaseModel):
    """Общие поля категории."""

    name: str = Field(min_length=1, max_length=64)
    description: str | None = Field(default=None, max_length=512)


class CategoryCreate(CategoryBase):
    """Создание категории."""

    slug: str | None = Field(default=None, max_length=64)

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
        if self.slug:
            return self.slug
        slug: str = _to_slug(self.name)
        if not slug:
            msg = "Не удалось сгенерировать slug из имени"
            raise ValueError(msg)
        return slug


class CategoryUpdate(BaseModel):
    """Частичное обновление категории."""

    model_config = ConfigDict(extra="forbid")

    name: str | None = Field(default=None, min_length=1, max_length=64)
    slug: str | None = Field(default=None, max_length=64)
    description: str | None = Field(default=None, max_length=512)


class CategoryRead(CategoryBase):
    """Категория для чтения."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    products_count: int = 0
    created_at: datetime
    updated_at: datetime
