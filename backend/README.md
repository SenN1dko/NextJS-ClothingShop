# Dressly — backend

FastAPI + SQLAlchemy 2.0 (async) + PostgreSQL. Подробная инструкция по
запуску всего проекта — в [README.md](../README.md).

## Структура

```
src/
├── main.py              точка входа, lifespan, обработчики ошибок
├── core/
│   ├── settings.py      конфигурация из переменных окружения
│   ├── security.py      argon2-хеши паролей, JWT
│   └── db/              engine, фабрика сессий, базовый класс
├── models/              ORM-модели (product, category, user, cart)
├── schemas/             pydantic-схемы запросов и ответов
├── repositories/        доступ к данным
├── services/            бизнес-логика
├── api/
│   ├── dependencies.py  DI: сервисы, текущий пользователь
│   └── v1/              роутеры
├── alembic/             миграции
└── scripts/seed.py      демо-данные
```

Слои разделены строго: `api` → `services` → `repositories` → `models`.
Схемы не импортируются в `models`, модели не знают о HTTP.

## Запуск

Из корня `backend/`:

```bash
uv sync
uv run alembic upgrade head
uv run python -m scripts.seed
uv run python src/main.py
```

Приложение лежит в `src/` и устанавливается в редактируемом режиме,
поэтому импорты `core`, `models`, `api` работают из любого каталога
внутри `backend/`. Команды можно запускать оттуда, а не из `src/`.

## Docker

```bash
docker compose up -d --build   # из корня репозитория
```

Образ описан в `backend/Dockerfile`. Нюансы:

- `PYTHONPATH=/app/src` задан явно: полагаться на editable-установку в
  образ не стоит, `.pth`-файлы туда не попадают.
- Точка входа — `uvicorn` из `.venv/bin`, а не `uv run`: при старте uv
  способен пересоздать окружение и потерять пакеты.
- `README.md` копируется до `uv sync` — он указан в `pyproject.toml`
  как `readme`, и без него сборка падает.
- В образе нет `tests/` и `.venv` хоста: см. `.dockerignore`.

## Переменные окружения

Полный список с комментариями — в `.env.example`. Ключевые:

| Переменная                   | Назначение                          |
| ---------------------------- | ----------------------------------- |
| `ENVIRONMENT`                | `dev` / `prod`                      |
| `DB__HOST`, `DB__PORT`, ...  | Подключение к PostgreSQL            |
| `AUTH__SECRET_KEY`           | Ключ подписи JWT (≥32 симв. в prod) |
| `CORS_ORIGINS`               | Разрешённые источники               |

Пароль БД хранится в `SecretStr` и не попадает в логи или `model_dump()`.

## Тесты

```bash
docker exec dressly-db psql -U user -d shop -c "CREATE DATABASE shop_test;"
uv run pytest
```

Тесты поднимают схему на `shop_test` сами, но саму базу нужно создать
один раз. Тесты проверяют API целиком через `httpx.AsyncClient`.

## Линтинг

```bash
uv run ruff check src tests
uv run ruff format src tests
```
