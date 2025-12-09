import { useQuery } from '@tanstack/react-query';
import { IProducts } from '@/types/card.type';
import { PRODUCTS_QUERY_KEY, fetchProducts } from '@/services/cardServices';

export function useProductsQuery() {
  return useQuery<IProducts[]>({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
