'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { MenuNav } from '@/data/MenuNav.data';

import { MenuItem } from './MenuItem';

export function Menu() {
  const pathname = usePathname();

  return (
    <nav className="flex h-[50px] w-full items-center justify-center overflow-x-auto bg-surface/60 dark:bg-surface-dark">
      {MenuNav.map((item) => (
        <MenuItem
          key={item.id}
          isActive={!!match(item.link)(pathname)}
          menuItem={item}
        />
      ))}
    </nav>
  );
}
