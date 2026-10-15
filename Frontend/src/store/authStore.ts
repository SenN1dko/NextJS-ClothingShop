import { create } from 'zustand';

import { Endpoints } from '@/services/endpoints';
import { readTokens, writeTokens } from '@/lib/apiClient';
import type { ITokenPair, IUser } from '@/types/card.type';

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: {
    username: string;
    email: string;
    password: string;
    full_name?: string;
  }) => Promise<void>;
  logout: () => void;
  restore: () => Promise<void>;
}

const hasSession = () => readTokens() !== null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const tokens: ITokenPair = await Endpoints.login({
        username,
        password,
      });

      writeTokens({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });

      const user: IUser = await Endpoints.getMe();
      set({ user, isLoading: false });
    } catch (error) {
      writeTokens(null);
      set({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка входа',
      });
      throw error;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      await Endpoints.register(payload);
      const tokens: ITokenPair = await Endpoints.login({
        username: payload.username,
        password: payload.password,
      });
      writeTokens({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
      const user: IUser = await Endpoints.getMe();
      set({ user, isLoading: false });
    } catch (error) {
      writeTokens(null);
      set({
        user: null,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Ошибка регистрации',
      });
      throw error;
    }
  },

  logout: () => {
    writeTokens(null);
    set({ user: null, error: null });
  },

  restore: async () => {
    if (!hasSession()) return;

    set({ isLoading: true });
    try {
      const user: IUser = await Endpoints.getMe();
      set({ user, isLoading: false });
    } catch {
      // Токен протух или невалиден — чистим сессию.
      writeTokens(null);
      set({ user: null, isLoading: false });
    }
  },
}));
