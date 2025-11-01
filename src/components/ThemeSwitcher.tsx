// components/ThemeSwitcher.js
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 p-2" />;
  }

  const isDark = theme === 'dark';
  const IconComponent = isDark ? Sun : Moon;
  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      onClick={toggle}
      className="p-2 cursor-pointer rounded-full flex items-center shadow-sm dark:shadow-none bg-gray-200 dark:bg-gray-700 transition-colors"
      title="Toggle theme"
    >
      <IconComponent className="w-8 h-8 fill-current" />
    </button>
  );
}
