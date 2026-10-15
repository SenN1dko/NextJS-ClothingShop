import type { Metadata } from 'next';

import {
  CategoryPage,
  createCategoryMetadata,
} from '@/components/CategoryPage';

export const metadata: Metadata = createCategoryMetadata('WOMEN');

export default function WomenPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <CategoryPage
      page="WOMEN"
      description="Платья, блузки, кардиганы и аксессуары."
      searchParams={searchParams}
    />
  );
}
