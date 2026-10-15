'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { PAGES } from '@/config/pages.config';
import { toApiError } from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function CartPage() {
  const user = useAuthStore((s) => s.user);
  const { cart, isLoading, error, updateItem, removeItem, clear } =
    useCartStore();

  if (!user) {
    return (
      <section className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Корзина</h1>
        <p className="mb-6 text-neutral-500">
          Войдите в аккаунт, чтобы увидеть свои покупки.
        </p>
        <Link
          href={PAGES.LOGIN}
          className="rounded-full bg-black px-5 py-2 font-medium text-white dark:bg-white dark:text-black"
        >
          Login
        </Link>
      </section>
    );
  }

  if (isLoading) {
    return <p className="py-16 text-center text-neutral-500">Загрузка...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="py-16 text-center text-red-600">
        {toApiError(error).message}
      </p>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Корзина</h1>
        <p className="mb-6 text-neutral-500">Корзина пока пуста.</p>
        <Link
          href={PAGES.HOME}
          className="rounded-full bg-black px-5 py-2 font-medium text-white dark:bg-white dark:text-black"
        >
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Корзина</h1>
        <button
          type="button"
          onClick={() => void clear()}
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-red-600"
        >
          Очистить
        </button>
      </div>

      <ul className="mb-8 divide-y">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 py-4"
          >
            <Link
              href={`${PAGES.PRODUCT}/${item.product_id}`}
              className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-surface dark:bg-surface-dark"
            >
              <Image
                src={item.image_url}
                alt={item.product_name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`${PAGES.PRODUCT}/${item.product_id}`}
                className="block truncate font-medium hover:underline"
              >
                {item.product_name}
              </Link>
              {item.size && (
                <p className="text-sm text-neutral-500">
                  Размер: {item.size}
                </p>
              )}
              <p className="text-sm text-neutral-500">
                {formatPrice(item.unit_price)} / шт.
              </p>
            </div>

            <label className="sr-only" htmlFor={`qty-${item.id}`}>
              Количество {item.product_name}
            </label>
            <input
              id={`qty-${item.id}`}
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (next >= 1) void updateItem(item.id, next);
              }}
              className="w-20 rounded-lg border p-2"
            />

            <p className="w-24 text-right font-semibold">
              {formatPrice(item.line_total)}
            </p>

            <button
              type="button"
              onClick={() => void removeItem(item.id)}
              aria-label={`Удалить ${item.product_name} из корзины`}
              className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-surface hover:text-red-600 dark:hover:bg-surface-dark"
            >
              <Trash2 className="h-5 w-5" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-end border-t pt-4">
        <p className="text-xl font-bold">
          Итого: {formatPrice(cart.total_price)}
        </p>
      </div>
    </section>
  );
}
