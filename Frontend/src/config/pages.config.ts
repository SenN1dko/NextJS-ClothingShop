export const PAGES = {
  HOME: '/',
  CART: '/cart',
  WOMEN: '/women',
  MAN: '/man',
  KIDS: '/kids',
  BRANDS: '/brands',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCT: '/card',
} as const;

export type PageKey = keyof typeof PAGES;

/** Соответствие slug категории и раздела меню. */
export const CATEGORY_BY_PAGE: Partial<Record<PageKey, string>> = {
  WOMEN: 'women',
  MAN: 'men',
  KIDS: 'kids',
};
