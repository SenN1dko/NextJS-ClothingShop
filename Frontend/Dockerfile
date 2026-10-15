# syntax=docker/dockerfile:1.7

# Синтаксис Dockerfile
#   1 — образ
#   2 — пользователь
#   3 — описание
#   4 — база
# docs: https://docs.docker.com/reference/dockerfile/

ARG NODE_VERSION=22-alpine

# ========================= deps =========================
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Только манифесты: слой с зависимостями кэшируется отдельно
# от исходников и пересобирается только при изменении lock-файла.
COPY package.json package-lock.json ./

# npm кладёт загруженные пакеты в кэш, который переиспользуется
# между запусками в CI: npm ci при неизменном lock-файле идёт
# почти мгновенно.
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# ========================= build =========================
FROM node:${NODE_VERSION} AS build
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Бэкенд по умолчанию — сервис `api` из docker-compose.
ARG API_INTERNAL_URL=http://api:8000
ENV API_INTERNAL_URL=${API_INTERNAL_URL}

# Собираем с публичными переменными окружения: они попадают
# в клиентский бандл и должны быть известны на этапе сборки.
ARG NEXT_PUBLIC_BASE_URL=/api/v1
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

RUN npm run build

# ======================= runner ========================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# standalone-вывод не копирует public и статику — делаем это сами.
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]