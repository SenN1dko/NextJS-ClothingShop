import { Endpoints } from '@/services/endpoints';
import type { IProduct, IProductFilters } from '@/types/card.type';

export const PRODUCTS_QUERY_KEY = 'products';
export const PRODUCT_QUERY_KEY = 'product';
export const CATEGORIES_QUERY_KEY = 'categories';

export async function fetchProducts(
  filters: IProductFilters = {},
): Promise<IProduct[]> {
  const page = await Endpoints.getProducts(filters);
  return page.items;
}

export async function fetchPaginatedProducts(
  filters: IProductFilters = {},
): Promise<{ items: IProduct[]; total: number; hasMore: boolean }> {
  const page = await Endpoints.getProducts(filters);
  return {
    items: page.items,
    total: page.meta.total,
    hasMore: page.meta.has_more,
  };
}

export async function fetchProductById(id: number): Promise<IProduct> {
  return Endpoints.getProductById(id);
}

export async function fetchCategories() {
  return Endpoints.getCategories();
}
