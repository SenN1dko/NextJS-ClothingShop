import { IProducts } from '@/types/card.type';
import { Endpoints } from '@/services/endpoints';
export const PRODUCTS_QUERY_KEY = 'products';
export const PRODUCT_QUERY_KEY = 'product';
export async function fetchProducts(): Promise<IProducts[]> {
  const data = await Endpoints.getProducts();
  return data;
}

export async function fetchProductById(id: number): Promise<IProducts> {
  const data = await Endpoints.getProductById(id);
  return data;
}
