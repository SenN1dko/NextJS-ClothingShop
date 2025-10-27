from fastapi import APIRouter


router = APIRouter(prefix="/product")


@router.get("/all")
async def get_products():
    return {"message": "success"}


@router.post("/create")
async def create_products():
    return {"message": "success"}
