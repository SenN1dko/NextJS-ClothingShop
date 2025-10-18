import { Link } from 'react-router-dom';
import { ShoppingCart, Book } from 'lucide-react';
export const Header = () => {
  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Мой магазин</h1>
        <nav className="flex gap-6">
          <Link to="/">
            <Book
              className="hover:rotate-15 transition-transform duration-333 ease-in"
              size={20}
            />
          </Link>
          <Link to="/cart " className="flex relative">
            <ShoppingCart className="hover:rotate-15 transition-transform duration-333 ease-in" />
            <div className=" rounded-[100%] font-bold text-xs w-4.5 h-4 bg-yellow-300 text-black text-center left-3 bottom-4 absolute ">
              1
            </div>
          </Link>
        </nav>
      </header>
    </>
  );
};
