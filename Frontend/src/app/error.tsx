'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Граница ошибок верхнего уровня. Ловит сбои рендеринга. */
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <AlertTriangle className="h-14 w-14 text-red-600" aria-hidden />
      <div>
        <h1 className="mb-2 text-3xl font-bold">Что-то пошло не так</h1>
        <p className="max-w-md text-neutral-500 dark:text-neutral-400">
          {error.message || 'Произошла непредвиденная ошибка.'}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-neutral-400">
            Код: {error.digest}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-black"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Попробовать снова
      </button>
    </div>
  );
}
