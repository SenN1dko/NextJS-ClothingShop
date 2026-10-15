import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_QUERY_KEY, fetchPaginatedProducts } from '@/services/cardServices';
import type { IProductFilters } from '@/types/card.type';

export function useProductsQuery(filters: IProductFilters = {}) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, filters],
    queryFn: () => fetchPaginatedProducts(filters),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
