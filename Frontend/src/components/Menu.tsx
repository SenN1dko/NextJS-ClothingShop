'use client';

import { MenuItem } from './MenuItem';
import { MenuNav } from '@/data/MenuNav.data';
import { match } from 'path-to-regexp';
import { usePathname } from 'next/navigation';
export function Menu() {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex item-center justify-center w-full  h-[50px] bg-surface/60 dark:bg-surface-dark ">
        {MenuNav.map((item) => (
          <MenuItem
            key={item.id}
            isActive={!!match(item.link)(pathname)}
            menuItem={item}
          />
        ))}
      </nav>
    </>
  );
}
