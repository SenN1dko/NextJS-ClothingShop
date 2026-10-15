import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AllProducts } from '@/components/AllProducts';
import { SkeletonLoading } from '@/components/SkeletonLoading';

export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Каталог одежды Dressly: мужская, женская и детская одежда.',
};

interface Props {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search?.trim() || undefined;
  const category = params.category?.trim() || undefined;

  return (
    <section aria-label="Каталог товаров">
      <h1 className="mb-6 text-3xl font-bold text-text dark:text-text-dark">
        {search ? `Результаты: «${search}»` : 'Каталог'}
      </h1>

      <Suspense fallback={<SkeletonLoading />}>
        <AllProducts filters={{ search, category, limit: 40 }} />
      </Suspense>
    </section>
  );
}
