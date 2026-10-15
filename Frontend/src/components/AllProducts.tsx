'use client';

import { useProductsQuery } from '@/hooks/useProductsQuery';
import type { IProductFilters } from '@/types/card.type';

import { ErrorMessage } from './ErrorMessage';
import { Product } from './Product';
import { SkeletonLoading } from './SkeletonLoading';

interface Props {
  filters?: IProductFilters;
  emptyMessage?: string;
}

export function AllProducts({
  filters = {},
  emptyMessage = 'Товары не найдены',
}: Props) {
  const { data, error, isLoading, isError, refetch } = useProductsQuery(filters);

  if (isLoading) return <SkeletonLoading />;

  if (isError) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={() => void refetch()}
      />
    );
  }

  const products = data?.items ?? [];

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500 dark:text-neutral-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-6">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {data && data.total > products.length && (
        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Показано {products.length} из {data.total}
        </p>
      )}
    </>
  );
}
