"""Корневой роутер API."""

from fastapi import APIRouter

from api.v1 import router as v1_router
from core.settings import settings

router = APIRouter(prefix=settings.api.prefix)
router.include_router(
    v1_router,
    prefix=settings.api.v1,
)
