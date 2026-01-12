import { useQuery } from '@tanstack/react-query';
import { IProducts } from '@/types/card.type';
import { PRODUCT_QUERY_KEY, fetchProductById } from '@/services/cardServices';
export function useProductQuery(id: number) {
  return useQuery<IProducts>({
    queryKey: [PRODUCT_QUERY_KEY, id],
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 5,
    enabled: id != null,
    refetchOnWindowFocus: false,
  });
}
