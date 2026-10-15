'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Тема определяется на клиенте, поэтому до монтирования рендерим
  // заглушку, чтобы избежать расхождения разметки при гидрации.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />;
  }

  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={
        isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'
      }
      className="flex cursor-pointer items-center rounded-full bg-gray-200 p-2 shadow-sm transition-colors dark:bg-gray-700 dark:shadow-none"
    >
      <Icon className="h-6 w-6 fill-current" aria-hidden />
    </button>
  );
}
