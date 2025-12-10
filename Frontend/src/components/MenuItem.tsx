'use client';

import { IMenuItem } from '@/data/MenuNav.data';
import Link from 'next/link';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
interface Props {
  isActive: boolean;
  menuItem: IMenuItem;
}

export function MenuItem({ isActive, menuItem }: Props) {
  const [activeMenu, setActiveMenu] = useState(false);

  console.log('isActive', activeMenu);

  return (
    <>
      <Link
        href={menuItem.link}
        className="flex items-center justify-center  w-fit px-3 h-full hover:border-b-4 transition-all hover:border-black duration-50 ease dark:hover:border-white"
        onMouseEnter={() => setActiveMenu(true)}
        onMouseLeave={() => setActiveMenu(false)}
      >
        <div
          className={`dark:text-text-dark text-text text-lg font-bold  ${
            isActive ? 'text-gray-50' : ''
          }`}
        >
          {menuItem.title}
        </div>
      </Link>
      <AnimatePresence>
        {activeMenu && (
          <>
            <m.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveMenu(true)}
              onMouseLeave={() => setActiveMenu(false)}
              className=" absolute origin-top left-0 top-35 w-full  overflow-hidden bg-surface/95 dark:bg-surface-dark/95 justify-around rounded-b-xl shadow-lg p-6 flex gap-3 z-50 "
            >
              {menuItem.columns.map((col) => (
                <div key={col.heading}>
                  <h4 className="font-bold mb-3 text-text dark:text-text-dark">
                    {col.heading}
                  </h4>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-text font-light text-lg dark:hover:border-white dark:text-text-dark hover:border-b hover:border-black  "
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
