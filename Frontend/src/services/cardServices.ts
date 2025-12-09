import { IProducts } from '@/types/card.type';
import { Endpoints } from '@/services/endpoints';
export const PRODUCTS_QUERY_KEY = 'products';

export async function fetchProducts(): Promise<IProducts[]> {
  const data = await Endpoints.getProducts();
  return data;
}
