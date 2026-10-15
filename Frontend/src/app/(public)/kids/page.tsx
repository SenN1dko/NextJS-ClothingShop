import type { Metadata } from 'next';

import {
  CategoryPage,
  createCategoryMetadata,
} from '@/components/CategoryPage';

export const metadata: Metadata = createCategoryMetadata('KIDS');

export default function KidsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <CategoryPage
      page="KIDS"
      description="Одежда для детей: от повседневной до нарядной."
      searchParams={searchParams}
    />
  );
}
