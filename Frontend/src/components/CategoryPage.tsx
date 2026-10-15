import { Suspense } from 'react';
import type { Metadata } from 'next';

import { CATEGORY_BY_PAGE } from '@/config/pages.config';
import type { PageKey } from '@/config/pages.config';

import { AllProducts } from './AllProducts';
import { SkeletonLoading } from './SkeletonLoading';

interface Props {
  page: PageKey;
  description: string;
  searchParams: Promise<{ search?: string }>;
}

const TITLES: Partial<Record<PageKey, string>> = {
  WOMEN: 'Женская одежда',
  MAN: 'Мужская одежда',
  KIDS: 'Детская одежда',
};

function titleOf(page: PageKey): string {
  return TITLES[page] ?? 'Каталог';
}

/** Общая страница раздела каталога, привязанная к slug категории. */
export function CategoryPage({ page, description, searchParams }: Props) {
  return (
    <section aria-label={titleOf(page)}>
      <Suspense fallback={<SkeletonLoading />}>
        <CategoryContent
          page={page}
          description={description}
          searchParams={searchParams}
        />
      </Suspense>
    </section>
  );
}

async function CategoryContent({ page, description, searchParams }: Props) {
  const params = await searchParams;
  const search = params.search?.trim() || undefined;

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-text dark:text-text-dark">
        {titleOf(page)}
      </h1>
      <p className="mb-6 text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
      <AllProducts
        filters={{ category: CATEGORY_BY_PAGE[page], search, limit: 40 }}
      />
    </>
  );
}

export function createCategoryMetadata(page: PageKey): Metadata {
  const title = titleOf(page);
  return { title, description: `Dressly: ${title.toLowerCase()}.` };
}
