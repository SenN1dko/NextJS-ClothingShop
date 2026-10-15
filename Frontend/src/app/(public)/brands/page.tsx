'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { ErrorMessage } from '@/components/ErrorMessage';
import { SkeletonLoading } from '@/components/SkeletonLoading';
import {
  CATEGORIES_QUERY_KEY,
  fetchCategories,
} from '@/services/cardServices';

export default function BrandsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <SkeletonLoading />;

  if (isError) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="py-16 text-center text-neutral-500">
        Категории пока не добавлены
      </p>
    );
  }

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold">Категории</h1>
      <p className="mb-6 text-neutral-500 dark:text-neutral-400">
        Все разделы каталога Dressly.
      </p>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {data.map((category) => (
          <li key={category.id}>
            <Link
              href={`/?category=${category.slug}`}
              className="block rounded-xl border p-4 transition-colors hover:border-neutral-400"
            >
              <p className="font-semibold">{category.name}</p>
              <p className="text-sm text-neutral-500">
                {category.products_count} товаров
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
