# syntax=docker/dockerfile:1.7
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

WORKDIR /app

# Сначала зависимости, чтобы слой кэшировался независимо от кода.
# README нужен уже на этом шаге: он указан в pyproject.toml
# как readme проекта, и сборка падает без него.
COPY pyproject.toml uv.lock README.md ./

# --mount даёт кэш пакетов между запусками в CI: при неизменном
# uv.lock скачивание пропускается целиком.
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=cache,target=/tmp/build-cache \
    pip install --no-cache-dir uv \
    && uv sync --frozen --no-dev

# Копируем код отдельным слоем после установки зависимостей.
COPY . .

# Приложение живёт в src/. Указываем путь явно: editable-установка
# в образ не попадает, а полагаться на неё при запуске рискованно.
ENV PYTHONPATH=/app/src \
    PATH="/app/.venv/bin:$PATH"

# Запускаем напрямую из venv, а не через `uv run`: uv может
# пересоздать окружение при старте и потерять установленные пакеты.

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
    CMD python -c "import urllib.request;urllib.request.urlopen('http://127.0.0.1:8000/health').read()" || exit 1

CMD ["uvicorn", "main:app", \
     "--app-dir", "src", "--host", "0.0.0.0", "--port", "8000"]