import { Header } from '@/components/Header';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import type { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <div className="min-h-screen ">
        <Header />
        <div className="w-full max-w-xl flex justify-center px-4 py-8">
          {children}
        </div>
      </div>
      <div className="fixed bottom-5 right-5">
        <ThemeSwitcher />
      </div>
    </>
  );
}
