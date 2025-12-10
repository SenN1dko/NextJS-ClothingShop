import Link from 'next/link';
import { ShoppingBasket, Search } from 'lucide-react';
import { PAGES } from '@/config/pages.config';
import { Menu } from './Menu';
import localFont from 'next/font/local';

const myFont = localFont({
  // my font in public/fonts
  src: '../../public/fonts/Casual-Regular.ttf',
  variable: '--font-myFont',
  display: 'swap',
});

export const Header = () => {
  return (
    <>
      <header className="bg-background dark:bg-background-dark z-51 h-[140px] flex-col flex w-full sticky top-0 ">
        <div className="flex items-center h-[90px]  w-full border-b border-[#545353]">
          <h1
            className={`text-4xl ${myFont.className} -translate-y-1.5  font-sans text-[#95c0a4] font-medium mx-10`}
          >
            <Link href={PAGES.HOME} className="">
              Dressly
            </Link>
          </h1>
          <div className="w-[90%] pr-5 h-full flex items-center relative ">
            <div className="  absolute left-3  z-10 ">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for something interesting ... "
              className="dark:bg-surface-dark bg-surface pl-9 font-bold  dark:placeholder:text-text-dark placeholder:text-text placeholder:font-medium  h-11  w-full   hover:border-[#dfdfdf] rounded-lg border border-[#5d5d5d]"
            />
          </div>
          <nav className="flex items-center  pr-10 w-90">
            <div className="flex items-center pr-5">
              <Link href={PAGES.CART} className="flex relative w-full h-full">
                <ShoppingBasket className="hover:rotate-15 w-8 h-8 transition-transform duration-333 ease-in " />
                <div className="  translate-y-[-5px] font-bold text-[14px] flex items-center justify-center   -top-1 -right-2  w-fit  h-full rounded-full    ">
                  1
                </div>
              </Link>
            </div>
            <div className="flex gap-2 items-center  w-full">
              <div className="   text-md font-bold border cursor-pointer  rounded-3xl px-3 py-1.5">
                Login
              </div>
              <div className=" text-md font-bold bg-black dark:bg-white rounded-3xl text-white dark:text-black  cursor-pointer px-3 py-1.5 whitespace-nowrap">
                Sign Up
              </div>
            </div>
          </nav>
        </div>
        <div>
          <Menu />
        </div>
      </header>
    </>
  );
};
