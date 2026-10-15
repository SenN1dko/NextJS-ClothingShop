import Link from 'next/link';
import { PAGES } from '@/config/pages.config';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-black text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="max-w-sm px-4 text-neutral-300">
        Страница не найдена. Возможно, товар удалён или ссылка устарела.
      </p>
      <Link
        href={PAGES.HOME}
        className="rounded-full bg-white px-5 py-2 font-medium text-black transition-colors hover:bg-neutral-200"
      >
        На главную
      </Link>
    </div>
  );
}
