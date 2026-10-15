"""Общие схемы: пагинация и конверты ответов."""

from pydantic import BaseModel, Field


class PageMeta(BaseModel):
    """Метаданные пагинации."""

    total: int = Field(description="Всего записей")
    limit: int = Field(description="Размер страницы")
    offset: int = Field(description="Смещение")
    has_more: bool = Field(description="Есть ли следующая страница")


class PaginatedResponse[T: BaseModel](BaseModel):
    """Страница результатов с метаданными."""

    items: list[T]
    meta: PageMeta


class MessageResponse(BaseModel):
    """Простой ответ с текстовым сообщением."""

    message: str
