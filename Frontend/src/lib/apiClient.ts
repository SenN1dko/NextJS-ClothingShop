import axios, { AxiosError, AxiosInstance } from 'axios';

import type { IApiError } from '@/types/card.type';

/**
 * Базовый URL для клиентских запросов.
 *
 * На клиенте используем относительный путь: Next.js проксирует `/api/*`
 * на бэкенд через `rewrites` в next.config.ts. Так запросы идут на
 * тот же origin, CORS не нужен, а URL бэкенда не светится в бандле.
 *
 * На сервере обращаемся напрямую (rewrites там не работают).
 */
const isServer = typeof window === 'undefined';

export const API_BASE_URL = isServer
  ? `${process.env.API_INTERNAL_URL ?? 'http://127.0.0.1:8000'}/api/v1`
  : '/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

/** Приводит любую ошибку axios к предсказуемому виду. */
export function toApiError(error: unknown): IApiError {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { detail?: unknown } | undefined;
    const detail = data?.detail;

    let message = 'Не удалось выполнить запрос';
    if (typeof detail === 'string') {
      message = detail;
    } else if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0] as { msg?: string };
      if (first?.msg) message = first.msg;
    } else if (error.code === 'ECONNABORTED') {
      message = 'Превышено время ожидания ответа сервера';
    } else if (!error.response) {
      message = 'Нет связи с сервером';
    }

    return { message, statusCode: error.response?.status ?? 0 };
  }

  return {
    message: error instanceof Error ? error.message : 'Неизвестная ошибка',
    statusCode: 0,
  };
}

/** Токены хранятся в localStorage и подставляются в каждый запрос. */
export const TOKEN_STORAGE_KEY = 'dressly_tokens';

export interface IStoredTokens {
  access_token: string;
  refresh_token: string;
}

export function readTokens(): IStoredTokens | null {
  if (isServer) return null;

  try {
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as IStoredTokens;
    if (!parsed.access_token || !parsed.refresh_token) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function writeTokens(tokens: IStoredTokens | null): void {
  if (isServer) return;

  if (tokens === null) {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

apiClient.interceptors.request.use((config) => {
  const tokens = readTokens();
  if (tokens?.access_token) {
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
  }
  return config;
});

export default apiClient;
