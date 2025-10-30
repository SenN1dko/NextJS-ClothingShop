'use client';
import { useThemeStore } from '@/store/ThemeStore';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 cursor-pointer rounded-full flex shadow-sm dark:shadow-none shadow-gray-800/50 items-center bg-[var(--color-l-primary)] dark:bg-[#393939] transition-colors"
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="fill-white text-white w-8 h-8" />
      ) : (
        <Moon className="fill-black text-black w-8 h-8" />
      )}
    </button>
  );
}
