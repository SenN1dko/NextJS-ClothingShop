# Dressly

Интернет-магазин одежды: FastAPI + PostgreSQL на бэкенде, Next.js на фронтенде.

## Структура

```
.
├── docker-compose.yaml   весь стек: db, migrate, api, frontend, pgAdmin
├── API_CONTRACT.md       спецификация эндпоинтов для бэкенда
├── backend/              FastAPI, SQLAlchemy 2.0 (async), Alembic, pytest
└── Frontend/             Next.js 16 (App Router), TanStack Query, Tailwind v4
```

## Быстрый старт

### Вариант 1. Docker (весь стек одной командой)

```bash
docker compose up -d --build
```

Поднимает всё: PostgreSQL, миграции с демо-данными, бэкенд на `:8000`
и фронтенд на `:3000`. Отдельная БД не нужна — `migrate` создаёт схему
при первом старте.

| Сервис    | Адрес                            |
| ---------- | -------------------------------- |
| Frontend   | <http://localhost:3000>          |
| API        | <http://localhost:8000>          |
| Swagger UI | <http://localhost:8000/docs>    |

pgAdmin (`:5050`) включается отдельно, чтобы не крутился без нужды:

```bash
docker compose --profile tools up -d pgadmin
```

### Вариант 2. Локально (быстрее для разработки)

**База данных и бэкенд:**

```bash
cd backend
cp .env.example .env          # при необходимости поменяйте пароль
docker compose -f docker-compose.yaml up -d db   # только PostgreSQL
```

Либо поднимите только БД из корня репозитория:

```bash
docker compose up -d db
```

**Бэкенд:**

```bash
cd backend
uv sync
uv run alembic upgrade head   # создаёт схему
uv run python -m scripts.seed # демо-данные и учётные записи
uv run python src/main.py     # http://127.0.0.1:8000
```

**Фронтенд:**

```bash
cd Frontend
npm install
npm run dev                   # http://localhost:3000
```

Фронтенд обращается к бэкенду по `/api/v1`, а Next.js проксирует эти
запросы на `API_INTERNAL_URL` (по умолчанию `http://127.0.0.1:8000`).
Браузер ходит на тот же origin, поэтому в разработке CORS не нужен.

### Демо-доступы

| Роль  | Логин  | Пароль       |
| ----- | ------ | ------------ |
| admin | admin  | `admin12345` |
| user  | demo   | `demo12345`  |

## Команды

### backend

| Команда                                | Назначение                    |
| -------------------------------------- | ----------------------------- |
| `uv run pytest`                        | Тесты (нужна БД `shop_test`)  |
| `uv run ruff check src tests`          | Линтинг                       |
| `uv run ruff format src tests`         | Форматирование                |
| `uv run alembic revision --autogenerate -m "..."` | Новая миграция     |
| `uv run alembic check`                 | Проверка расхождений со схемой |
| `uv run python -m scripts.seed`        | Наполнение данными            |

Все команды с `alembic` и приложением запускаются из `backend/src`.

### Frontend

| Команда             | Назначение       |
| ------------------- | ---------------- |
| `npm run dev`       | Дев-сервер       |
| `npm run build`     | Продакшен-сборка |
| `npm run typecheck` | Проверка типов   |

## Docker

| Сервис    | Образ                          | Роль |
| --------- | ------------------------------ | ---- |
| `db`      | `postgres:17-alpine`           | Данные, том `shopdb-data` |
| `migrate` | образ `api`                    | Разовая: `alembic upgrade head` + `scripts.seed` |
| `api`     | `backend/Dockerfile`           | FastAPI на `:8000` |
| `frontend`| `Frontend/Dockerfile`          | Next.js на `:3000` |
| `pgadmin` | `dpage/pgadmin4:9`             | Только с `--profile tools` |

Полезные команды:

```bash
docker compose up -d --build          # пересобрать и поднять
docker compose logs -f api            # логи бэкенда
docker compose down                   # остановить (данные сохранятся)
docker compose down -v                # остановить и удалить том с данными
```

**Про `migrate`.** Сервис разовый: применяет миграции и заполняет базу
демо-данными, если она пуста, после чего завершается с кодом 0.
`api` стартует только после его успешного завершения
(`service_completed_successfully`), поэтому нельзя получить работающее
приложение на пустой схеме. Повторные запуски безопасны: `seed`
пропускает заполнение, если в базе уже есть товары.

**Про `API_INTERNAL_URL`.** Значение нужно в двух местах: как build-arg
при сборке образа фронтенда (rewrites вычисляются в `next.config.ts` и
попадают в бандл) и как environment при работе (RSC-запросы идут
напрямую, минуя rewrites). В compose оба заданы как `http://api:8000`.

**Образы.** Фронтенд собирается с `output: 'standalone'`, поэтому в
финальный образ попадают только нужные файлы и зависимости — 306 МБ
вместо полного `node_modules`. Бэкенд — 423 МБ, включая uv, pip и
кэш сборки; `pip install uv` можно вынести в отдельный слой, если
важен размер.

## API

Базовый префикс — `/api/v1`.

| Метод    | Путь                       | Доступ    | Описание                       |
| -------- | -------------------------- | --------- | ------------------------------ |
| `GET`    | `/products`                | публичный | Список с фильтрами и пагинацией |
| `GET`    | `/products/{id}`           | публичный | Товар по id                    |
| `POST`   | `/products`                | admin     | Создать товар                  |
| `PATCH`  | `/products/{id}`           | admin     | Обновить товар                 |
| `DELETE` | `/products/{id}`           | admin     | Удалить товар                  |
| `GET`    | `/categories`              | публичный | Список категорий               |
| `POST`   | `/categories`              | admin     | Создать категорию              |
| `PATCH`  | `/categories/{id}`         | admin     | Обновить категорию             |
| `DELETE` | `/categories/{id}`         | admin     | Удалить категорию              |
| `POST`   | `/users/register`          | публичный | Регистрация                    |
| `POST`   | `/users/login`             | публичный | Вход, выдаёт пару токенов      |
| `POST`   | `/users/refresh`           | публичный | Обновить токены                |
| `GET`    | `/users/me`                | авториз.  | Текущий пользователь           |
| `GET`    | `/cart`                    | авториз.  | Корзина                        |
| `POST`   | `/cart/items`              | авториз.  | Добавить товар                 |
| `PATCH`  | `/cart/items/{id}`         | авториз.  | Изменить количество            |
| `DELETE` | `/cart/items/{id}`         | авториз.  | Удалить позицию                |
| `DELETE` | `/cart`                    | авториз.  | Очистить корзину               |
| `GET`    | `/health`                  | публичный | Проверка живости               |

Параметры `GET /products`: `limit`, `offset`, `search`, `category`,
`min_price`, `max_price`, `in_stock`, `sort`
(`newest`, `price_asc`, `price_desc`, `name`, `popular`).

## Тесты

Тесты работают против отдельной БД `shop_test` — создайте её один раз:

```bash
docker exec dressly-db psql -U user -d shop -c "CREATE DATABASE shop_test;"
cd backend && uv run pytest
```

## Production

Перед развёртыванием задайте `ENVIRONMENT=prod` — приложение проверит,
что `AUTH__SECRET_KEY` заменён (минимум 32 символа), а `RELOAD` и
`DB__ECHO` выключены, и откажется стартовать иначе. В production
документация (`/docs`) и OpenAPI-схема отключаются.
