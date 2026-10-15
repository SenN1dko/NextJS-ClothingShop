'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBasket } from 'lucide-react';

import { useProductQuery } from '@/hooks/useProductQuery';
import { toApiError } from '@/lib/apiClient';
import { PAGES } from '@/config/pages.config';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

import { ErrorMessage } from '@/components/ErrorMessage';
import { SkeletonLoading } from '@/components/SkeletonLoading';

function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function ProductClient({ id }: { id: number }) {
  const { data: product, isLoading, error, refetch } = useProductQuery(id);

  const user = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);

  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  if (isLoading) return <SkeletonLoading />;

  if (error) {
    return (
      <ErrorMessage
        title="Не удалось загрузить товар"
        message={toApiError(error).message}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!product) {
    return (
      <p className="py-16 text-center text-neutral-500">Товар не найден</p>
    );
  }

  const outOfStock = product.stock === 0;
  const needsSize = product.sizes.length > 0;

  const handleAdd = async () => {
    if (!user) {
      setNotice('Войдите в аккаунт, чтобы добавить товар в корзину');
      return;
    }

    if (needsSize && !size) {
      setNotice('Выберите размер');
      return;
    }

    setNotice(null);
    try {
      await addItem(product.id, quantity, size ?? undefined);
      setNotice('Товар добавлен в корзину');
    } catch (err) {
      setNotice(toApiError(err).message);
    }
  };

  return (
    <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-surface dark:bg-surface-dark">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div>
        {product.brand && (
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            {product.brand}
          </p>
        )}

        <h1 className="mb-4 text-4xl font-bold text-text dark:text-text-dark">
          {product.name}
        </h1>

        <div className="mb-6 flex items-baseline gap-3">
          <p className="text-2xl font-semibold text-text dark:text-text-dark">
            {formatPrice(product.final_price)}
          </p>
          {product.discount_percent != null &&
            product.discount_percent > 0 && (
              <>
                <span className="text-lg text-neutral-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-700">
                  -{product.discount_percent}%
                </span>
              </>
            )}
        </div>

        {product.description && (
          <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>
        )}

        {product.sizes.length > 0 && (
          <fieldset className="mb-6">
            <legend className="mb-2 font-medium">Размер</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-12 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    size === s
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'hover:border-neutral-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="quantity" className="font-medium">
            Количество
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={Math.max(product.stock, 1)}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value) || 1))
            }
            className="w-20 rounded-lg border p-2"
          />
          <span className="text-sm text-neutral-500">
            {product.stock > 0
              ? `В наличии: ${product.stock}`
              : 'Нет в наличии'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          <ShoppingBasket className="h-5 w-5" aria-hidden />
          {outOfStock ? 'Нет в наличии' : 'В корзину'}
        </button>

        {notice && (
          <p
            role="status"
            className="mt-4 text-sm text-neutral-600 dark:text-neutral-300"
          >
            {notice}
          </p>
        )}

        <a
          href={PAGES.CART}
          className="mt-4 inline-block text-sm underline underline-offset-4"
        >
          Перейти в корзину
        </a>
      </div>
    </article>
  );
}
