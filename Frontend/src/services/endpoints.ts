import apiClient from '@/lib/apiClient';
import type {
  ICart,
  ICartItem,
  ICategory,
  IPaginated,
  IProduct,
  IProductFilters,
  ITokenPair,
  IUser,
} from '@/types/card.type';

/** Утилита: убирает `undefined` и пустые значения из query-параметров. */
function cleanParams(
  params: Record<string, unknown>,
): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    result[key] = value as string | number | boolean;
  }

  return result;
}

class EndpointsClient {
  // --- Товары ---

  async getProducts(
    filters: IProductFilters = {},
  ): Promise<IPaginated<IProduct>> {
    const { data } = await apiClient.get<IPaginated<IProduct>>('/products', {
      params: cleanParams({ ...filters }),
    });
    return data;
  }

  async getProductById(id: number): Promise<IProduct> {
    const { data } = await apiClient.get<IProduct>(`/products/${id}`);
    return data;
  }

  // --- Категории ---

  async getCategories(): Promise<ICategory[]> {
    const { data } = await apiClient.get<ICategory[]>('/categories');
    return data;
  }

  // --- Корзина (требует авторизации) ---

  async getCart(): Promise<ICart> {
    const { data } = await apiClient.get<ICart>('/cart');
    return data;
  }

  async addCartItem(payload: {
    product_id: number;
    quantity: number;
    size?: string | null;
  }): Promise<ICart> {
    const { data } = await apiClient.post<ICart>('/cart/items', payload);
    return data;
  }

  async updateCartItem(
    itemId: number,
    quantity: number,
  ): Promise<ICart> {
    const { data } = await apiClient.patch<ICart>(
      `/cart/items/${itemId}`,
      { quantity },
    );
    return data;
  }

  async removeCartItem(itemId: number): Promise<ICart> {
    const { data } = await apiClient.delete<ICart>(`/cart/items/${itemId}`);
    return data;
  }

  async clearCart(): Promise<ICart> {
    const { data } = await apiClient.delete<ICart>('/cart');
    return data;
  }

  // --- Аутентификация ---

  async login(payload: {
    username: string;
    password: string;
  }): Promise<ITokenPair> {
    const { data } = await apiClient.post<ITokenPair>(
      '/users/login',
      payload,
    );
    return data;
  }

  async register(payload: {
    username: string;
    email: string;
    password: string;
    full_name?: string | null;
  }): Promise<IUser> {
    const { data } = await apiClient.post<IUser>(
      '/users/register',
      payload,
    );
    return data;
  }

  async getMe(): Promise<IUser> {
    const { data } = await apiClient.get<IUser>('/users/me');
    return data;
  }

  async refresh(refreshToken: string): Promise<ITokenPair> {
    const { data } = await apiClient.post<ITokenPair>(
      '/users/refresh',
      {},
      { headers: { 'X-Refresh-Token': refreshToken } },
    );
    return data;
  }
}

export const Endpoints = new EndpointsClient();

export type { ICart, ICartItem };
