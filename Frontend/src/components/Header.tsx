'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, Search, ShoppingBasket } from 'lucide-react';
import localFont from 'next/font/local';

import { PAGES } from '@/config/pages.config';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

import { Menu } from './Menu';

const brandFont = localFont({
  src: '../../public/fonts/Casual-Regular.ttf',
  variable: '--font-brand',
  display: 'swap',
});

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState(searchParams.get('search') ?? '');

  const user = useAuthStore((s) => s.user);
  const restore = useAuthStore((s) => s.restore);
  const logout = useAuthStore((s) => s.logout);

  const totalItems = useCartStore((s) => s.cart.total_items);
  const fetchCart = useCartStore((s) => s.fetch);

  // Восстанавливаем сессию из localStorage один раз на клиенте.
  useEffect(() => {
    void restore();
    void fetchCart();
  }, [restore, fetchCart]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = term.trim();
    router.push(query ? `/?search=${encodeURIComponent(query)}` : '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background dark:bg-background-dark">
      <div className="flex h-20 w-full items-center gap-4 border-b border-[#545353] px-4 sm:px-6">
        <h1
          className={`shrink-0 text-3xl font-medium text-[#95c0a4] sm:text-4xl ${brandFont.variable}`}
        >
          <Link href={PAGES.HOME}>Dressly</Link>
        </h1>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="relative min-w-0 flex-1"
        >
          <Search
            size={20}
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            name="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Поиск по каталогу..."
            aria-label="Поиск товаров"
            className="h-11 w-full rounded-lg bg-surface/60 pl-9 font-bold placeholder:font-medium placeholder:text-text dark:bg-surface-dark dark:placeholder:text-text-dark"
          />
        </form>

        <nav className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link
            href={PAGES.CART}
            aria-label={`Корзина, товаров: ${totalItems}`}
            className="relative"
          >
            <ShoppingBasket className="h-8 w-8 transition-transform duration-300 hover:rotate-12" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                void fetchCart();
              }}
              className="flex items-center gap-2 rounded-3xl border px-3 py-1.5 text-sm font-bold transition-colors hover:bg-surface dark:hover:bg-surface-dark"
            >
              <span className="hidden max-w-24 truncate sm:inline">
                {user.username}
              </span>
              <LogOut className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <>
              <Link
                href={PAGES.LOGIN}
                className="hidden rounded-3xl border px-3 py-1.5 text-sm font-bold transition-colors hover:bg-surface sm:block dark:hover:bg-surface-dark"
              >
                Login
              </Link>
              <Link
                href={PAGES.REGISTER}
                className="whitespace-nowrap rounded-3xl bg-black px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-black"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      <Menu />
    </header>
  );
}
