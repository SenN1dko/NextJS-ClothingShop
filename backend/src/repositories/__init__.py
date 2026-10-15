"""Репозитории: доступ к данным."""

from repositories.base import BaseRepository
from repositories.cart import CartRepository
from repositories.category import CategoryRepository
from repositories.product import ProductRepository
from repositories.user import UserRepository

__all__ = [
    "BaseRepository",
    "CartRepository",
    "CategoryRepository",
    "ProductRepository",
    "UserRepository",
]
