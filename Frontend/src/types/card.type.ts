/** Товар в формате API. */
export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  brand: string | null;
  price: number;
  discount_percent: number | null;
  final_price: number;
  image_url: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  is_active: boolean;
  category_id: number;
  category: ICategoryBrief | null;
  created_at: string;
  updated_at: string;
}

export interface ICategoryBrief {
  id: number;
  name: string;
  slug: string;
}

export interface ICategory extends ICategoryBrief {
  description: string | null;
  products_count: number;
  created_at: string;
  updated_at: string;
}

export interface IPageMeta {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface IPaginated<T> {
  items: T[];
  meta: IPageMeta;
}

/** Параметры выборки товаров, зеркалящие query-параметры API. */
export interface IProductFilters {
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'name' | 'popular';
  limit?: number;
  offset?: number;
}

/** Корзина. */
export interface ICartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  image_url: string;
  size: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface ICart {
  items: ICartItem[];
  total_items: number;
  total_price: number;
}

/** Пользователь и авторизация. */
export interface IUser {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface ITokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

/** Нормализованная ошибка API. */
export interface IApiError {
  message: string;
  statusCode: number;
}
