# Dressly — frontend

Next.js 16 (App Router) + TanStack Query + Tailwind CSS v4 + Zustand.
Полная инструкция по запуску — в [README.md](../README.md).

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
```

## Docker

```bash
docker compose up -d --build   # из корня репозитория
```

Образ описан в `Frontend/Dockerfile`, сборка в три стадии: `deps`
(зависимости), `build` (`next build`), `runner`.

Что важно знать:

- В `next.config.ts` включён `output: 'standalone'` — в образ попадают
  только реально используемые файлы и зависимости, а не весь
  `node_modules`. `public` и `.next/static` копируются вручную:
  standalone их не включает.
- `API_INTERNAL_URL` нужен и как build-arg, и как environment.
  Как build-arg — потому что `rewrites()` вычисляются в
  `next.config.ts` на этапе сборки и попадают в бандл; как environment —
  потому что серверные компоненты ходят в API напрямую.
- Контейнер работает от непривилегированного пользователя `nextjs`
  (uid 1001).
- В образ не попадают `node_modules`, `.next`, `.env` и git-метаданные
  (`.dockerignore`).

## Переменные окружения

Скопируйте `.env.example` в `.env.local`. Значение по умолчанию подходит
для локальной разработки.

| Переменная           | Назначение                                      |
| -------------------- | ----------------------------------------------- |
| `API_INTERNAL_URL`   | Адрес бэкенда для RSC и для `rewrites`           |

Клиент ходит на относительный `/api/v1`; Next.js проксирует запрос на
`API_INTERNAL_URL` через `rewrites` в `next.config.ts`. Так обращения
идут на тот же origin, CORS в разработке не требуется.

## Структура

```
src/
├── app/
│   ├── layout.tsx          корневой layout, шрифты, метаданные
│   ├── error.tsx           граница ошибок верхнего уровня
│   ├── not-found.tsx       404
│   └── (public)/           публичные страницы с Header
│       ├── (home)/page.tsx        каталог
│       ├── card/[id]/             карточка товара
│       ├── cart/  login/  register/
│       └── women/ man/ kids/ brands/
├── components/         Header, Menu, Product, скелетоны, ошибки
├── hooks/              обёртки над TanStack Query
├── services/           запросы к API
├── lib/apiClient.ts    axios-инстанс, токены, нормализация ошибок
├── store/              Zustand: auth и корзина
├── types/              TypeScript-типы API
└── config/             карта маршрутов
```

## Данные

Серверные компоненты получают данные через `fetch` из `services/`,
клиентские — через TanStack Query. На странице товата данные
предзагружаются на сервере и передаются в клиент через
`HydrationBoundary`, поэтому первый рендер не мигает.

Ошибки приводятся к единому виду функцией `toApiError` и показываются
компонентом `ErrorMessage` с кнопкой повтора.

## Авторизация

Токены хранятся в `localStorage` и подставляются интерцептором axios.
`zustand`-сторы `auth` и `cart` восстанавливают сессию при загрузке
страницы. Страницы под авторизацией показывают приглашение войти,
а не редиректят.

## Команды

| Команда             | Назначение       |
| ------------------- | ---------------- |
| `npm run dev`       | Дев-сервер       |
| `npm run build`     | Продакшен-сборка |
| `npm run typecheck` | Проверка типов   |
