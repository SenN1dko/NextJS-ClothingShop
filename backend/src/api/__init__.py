from core.settings import settings
from .v1 import router as v1_router

from fastapi import APIRouter


router = APIRouter(prefix=settings.api.prefix)

router.include_router(
    v1_router, prefix=settings.api.v1.prefix
)
