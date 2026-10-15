"""Общие зависимости FastAPI: DI для сервисов и текущего пользователя."""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from core.db.db_depends import get_db_session
from core.security import decode_token
from models.user import User, UserRole
from repositories.cart import CartRepository
from repositories.category import CategoryRepository
from repositories.product import ProductRepository
from repositories.user import UserRepository
from services.cart_service import CartService
from services.category_service import CategoryService
from services.product_service import ProductService
from services.user_service import UserService

bearer_scheme = HTTPBearer(auto_error=False)

DBSession = Annotated[AsyncSession, Depends(get_db_session)]


def get_product_repo(session: DBSession) -> ProductRepository:
    return ProductRepository(session)


def get_category_repo(session: DBSession) -> CategoryRepository:
    return CategoryRepository(session)


def get_user_repo(session: DBSession) -> UserRepository:
    return UserRepository(session)


def get_cart_repo(session: DBSession) -> CartRepository:
    return CartRepository(session)


def get_product_service(
    product_repo: Annotated[
        ProductRepository,
        Depends(get_product_repo),
    ],
    category_repo: Annotated[
        CategoryRepository,
        Depends(get_category_repo),
    ],
) -> ProductService:
    return ProductService(product_repo, category_repo)


def get_category_service(
    category_repo: Annotated[
        CategoryRepository,
        Depends(get_category_repo),
    ],
) -> CategoryService:
    return CategoryService(category_repo)


def get_user_service(
    user_repo: Annotated[UserRepository, Depends(get_user_repo)],
) -> UserService:
    return UserService(user_repo)


def get_cart_service(
    cart_repo: Annotated[CartRepository, Depends(get_cart_repo)],
    product_repo: Annotated[
        ProductRepository,
        Depends(get_product_repo),
    ],
) -> CartService:
    return CartService(cart_repo, product_repo)


async def get_current_user(
    session: DBSession,
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
) -> User:
    """Извлекает текущего пользователя из access-токена."""
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Требуется авторизация",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise unauthorized

    user_id: int | None = decode_token(
        credentials.credentials,
        expected_type="access",
    )
    if user_id is None:
        raise unauthorized

    user: User | None = await session.get(User, user_id)
    if user is None:
        raise unauthorized
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Аккаунт заблокирован",
        )

    return user


async def require_admin(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """Пропускает только администраторов."""
    if current_user.role != UserRole.ADMIN:
        msg = "Недостаточно прав"
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=msg,
        )
    return current_user


CurrentUser = Annotated[User, Depends(get_current_user)]
AdminUser = Annotated[User, Depends(require_admin)]
ProductServiceDep = Annotated[ProductService, Depends(get_product_service)]
CategoryServiceDep = Annotated[
    CategoryService,
    Depends(get_category_service),
]
UserServiceDep = Annotated[UserService, Depends(get_user_service)]
CartServiceDep = Annotated[CartService, Depends(get_cart_service)]
