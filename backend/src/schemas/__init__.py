"""Схемы API: pydantic-модели запросов и ответов."""

from schemas.cart import (
    CartItemCreate,
    CartItemRead,
    CartItemUpdate,
    CartRead,
)
from schemas.category import (
    CategoryCreate,
    CategoryRead,
    CategoryUpdate,
)
from schemas.common import (
    MessageResponse,
    PageMeta,
    PaginatedResponse,
)
from schemas.product import (
    CategoryBrief,
    ProductCard,
    ProductCreate,
    ProductRead,
    ProductUpdate,
)
from schemas.user import (
    TokenPair,
    TokenPayload,
    UserLogin,
    UserRead,
    UserRegister,
)

__all__ = [
    "CartItemCreate",
    "CartItemRead",
    "CartItemUpdate",
    "CartRead",
    "CategoryBrief",
    "CategoryCreate",
    "CategoryRead",
    "CategoryUpdate",
    "MessageResponse",
    "PageMeta",
    "PaginatedResponse",
    "ProductCard",
    "ProductCreate",
    "ProductRead",
    "ProductUpdate",
    "TokenPair",
    "TokenPayload",
    "UserLogin",
    "UserRead",
    "UserRegister",
]
