'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Не удалось загрузить данные',
  message,
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/40"
    >
      <AlertCircle className="h-10 w-10 text-red-600" aria-hidden />
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
          {title}
        </h2>
        {message && (
          <p className="text-sm text-red-700 dark:text-red-300">
            {message}
          </p>
        )}
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Повторить
        </button>
      )}
    </div>
  );
}
