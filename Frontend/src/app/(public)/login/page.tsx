'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PAGES } from '@/config/pages.config';
import { toApiError } from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const fetchCart = useCartStore((s) => s.fetch);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login(username, password);
      await fetchCart();
      router.push(PAGES.HOME);
    } catch (err) {
      setError(toApiError(err).message);
    }
  };

  return (
    <section className="mx-auto max-w-sm py-12">
      <h1 className="mb-6 text-3xl font-bold">Вход</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="mb-1 block font-medium">
            Логин
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-black py-3 font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {isLoading ? 'Входим...' : 'Войти'}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-500">
        Нет аккаунта?{' '}
        <Link href={PAGES.REGISTER} className="underline underline-offset-4">
          Зарегистрируйтесь
        </Link>
      </p>
    </section>
  );
}
