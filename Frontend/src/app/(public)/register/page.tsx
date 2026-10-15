'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PAGES } from '@/config/pages.config';
import { toApiError } from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const fetchCart = useCartStore((s) => s.fetch);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
  });
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        ...(form.full_name ? { full_name: form.full_name } : {}),
      });
      await fetchCart();
      router.push(PAGES.HOME);
    } catch (err) {
      setError(toApiError(err).message);
    }
  };

  return (
    <section className="mx-auto max-w-sm py-12">
      <h1 className="mb-6 text-3xl font-bold">Регистрация</h1>

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
            minLength={3}
            pattern="[a-zA-Z0-9_]+"
            title="Только латиница, цифры и подчёркивание"
            value={form.username}
            onChange={update('username')}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update('email')}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="full_name" className="mb-1 block font-medium">
            Имя (необязательно)
          </label>
          <input
            id="full_name"
            name="full_name"
            autoComplete="name"
            value={form.full_name}
            onChange={update('full_name')}
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
            autoComplete="new-password"
            required
            minLength={8}
            value={form.password}
            onChange={update('password')}
            className="w-full rounded-lg border p-3"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Минимум 8 символов, буквы и цифры.
          </p>
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
          {isLoading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-500">
        Уже есть аккаунт?{' '}
        <Link href={PAGES.LOGIN} className="underline underline-offset-4">
          Войти
        </Link>
      </p>
    </section>
  );
}
