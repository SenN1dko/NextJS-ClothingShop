'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

import type { IMenuItem } from '@/data/MenuNav.data';

interface Props {
  isActive: boolean;
  menuItem: IMenuItem;
}

export function MenuItem({ isActive, menuItem }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={menuItem.link}
        aria-current={isActive ? 'page' : undefined}
        className={`flex h-full w-fit items-center justify-center px-3 text-lg font-bold transition-all hover:border-b-4 hover:border-black dark:hover:border-white ${
          isActive
            ? 'border-b-4 border-black dark:border-white'
            : 'text-text dark:text-text-dark'
        }`}
      >
        {menuItem.title}
      </Link>

      <AnimatePresence>
        {isOpen && menuItem.columns.length > 0 && (
          <m.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[min(90vw,60rem)] -translate-x-1/2 origin-top overflow-hidden rounded-b-xl bg-surface/95 p-6 shadow-lg dark:bg-surface-dark/95"
          >
            <div className="flex flex-wrap justify-around gap-6">
              {menuItem.columns.map((col) => (
                <div key={col.heading}>
                  <h4 className="mb-3 font-bold text-text dark:text-text-dark">
                    {col.heading}
                  </h4>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <span className="text-lg font-light text-text dark:text-text-dark">
                          {link}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
