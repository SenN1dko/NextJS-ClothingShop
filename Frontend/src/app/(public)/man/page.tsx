import type { Metadata } from 'next';

import {
  CategoryPage,
  createCategoryMetadata,
} from '@/components/CategoryPage';

export const metadata: Metadata = createCategoryMetadata('MAN');

export default function ManPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <CategoryPage
      page="MAN"
      description="Рубашки, футболки, брюки и куртки."
      searchParams={searchParams}
    />
  );
}
