from core.settings import settings
from .product import router as product_router
from .user import router as user_router

from fastapi import APIRouter


router = APIRouter()

router.include_router(
    product_router, prefix=settings.api.v1.products
)
router.include_router(user_router)
