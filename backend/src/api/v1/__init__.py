"""Сборка роутера версии v1."""

from fastapi import APIRouter

from api.v1.cart import router as cart_router
from api.v1.category import router as category_router
from api.v1.product import router as product_router
from api.v1.user import router as user_router

router = APIRouter()
router.include_router(product_router)
router.include_router(category_router)
router.include_router(user_router)
router.include_router(cart_router)
