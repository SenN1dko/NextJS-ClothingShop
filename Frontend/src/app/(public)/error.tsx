'use client';

import { ErrorMessage } from '@/components/ErrorMessage';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Граница ошибок для публичных страниц каталога. */
export default function CatalogError({ error, reset }: Props) {
  return (
    <div className="py-12">
      <ErrorMessage
        title="Не удалось загрузить страницу"
        message={error.message}
        onRetry={reset}
      />
    </div>
  );
}
