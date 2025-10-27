from .product import router as product_router

from fastapi import APIRouter


v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(product_router)
