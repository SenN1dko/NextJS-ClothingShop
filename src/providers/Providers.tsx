'use client'; // 👈 Обязательно Client Component

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // attribute="class" говорит next-themes прописать класс 'dark' или 'light'
    // на теге <html>
    <div></div>
  );
}
