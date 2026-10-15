'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';

import type { IProduct } from '@/types/card.type';

function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export function Product({ product }: { product: IProduct }) {
  const hasDiscount =
    product.discount_percent != null && product.discount_percent > 0;

  return (
    <Link href={`/card/${product.id}`} className="group block w-full">
      <div className="relative mb-0.5">
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-surface dark:bg-surface-dark">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
            -{product.discount_percent}%
          </span>
        )}

        {product.stock === 0 && (
          <span className="absolute inset-x-2 bottom-2 rounded-lg bg-black/70 py-1 text-center text-xs font-medium text-white">
            Нет в наличии
          </span>
        )}
      </div>

      <div className="p-2">
        {product.brand && (
          <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {product.brand}
          </p>
        )}
        <h2 className="font-light text-sm text-text dark:text-text-dark">
          {product.name}
        </h2>
        <div className="mt-1 flex items-baseline gap-2">
          <m.p
            initial={false}
            className={`text-xl font-bold ${
              hasDiscount ? 'text-red-600' : ''
            }`}
          >
            {formatPrice(product.final_price)}
          </m.p>
          {hasDiscount && (
            <span className="text-sm text-neutral-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
