import { Suspense } from 'react';
import type { PropsWithChildren } from 'react';

import { Header } from '@/components/Header';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

// Header использует useSearchParams, поэтому требует границы Suspense.
export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-[130px] w-full" />}>
          <Header />
        </Suspense>
        <main className="mx-auto w-full max-w-7xl px-4 py-8">
          {children}
        </main>
      </div>
      <div className="fixed bottom-5 right-5">
        <ThemeSwitcher />
      </div>
    </>
  );
}
