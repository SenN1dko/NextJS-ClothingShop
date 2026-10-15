import { create } from 'zustand';

import { Endpoints } from '@/services/endpoints';
import type { ICart } from '@/types/card.type';

const EMPTY_CART: ICart = {
  items: [],
  total_items: 0,
  total_price: 0,
};

interface CartState {
  cart: ICart;
  isLoading: boolean;
  error: string | null;

  fetch: () => Promise<void>;
  addItem: (productId: number, quantity: number, size?: string) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;
  reset: () => void;
}

function describe(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Не удалось обновить корзину';
}

export const useCartStore = create<CartState>((set) => ({
  cart: EMPTY_CART,
  isLoading: false,
  error: null,

  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await Endpoints.getCart();
      set({ cart, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: describe(error) });
    }
  },

  addItem: async (productId, quantity, size) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await Endpoints.addCartItem({
        product_id: productId,
        quantity,
        size: size ?? null,
      });
      set({ cart, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: describe(error) });
      throw error;
    }
  },

  updateItem: async (itemId, quantity) => {
    set({ error: null });
    try {
      const cart = await Endpoints.updateCartItem(itemId, quantity);
      set({ cart });
    } catch (error) {
      set({ error: describe(error) });
      throw error;
    }
  },

  removeItem: async (itemId) => {
    set({ error: null });
    try {
      const cart = await Endpoints.removeCartItem(itemId);
      set({ cart });
    } catch (error) {
      set({ error: describe(error) });
      throw error;
    }
  },

  clear: async () => {
    set({ error: null });
    try {
      const cart = await Endpoints.clearCart();
      set({ cart });
    } catch (error) {
      set({ error: describe(error) });
      throw error;
    }
  },

  reset: () => set({ cart: EMPTY_CART, error: null }),
}));
