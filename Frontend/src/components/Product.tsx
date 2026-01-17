'use client';
import { Heart } from 'lucide-react';
import { IProducts } from '@/types/card.type';
import { m } from 'framer-motion';
import Link from 'next/link';
export const Product = ({ product }: { product: IProducts }) => {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('Добавили в избранное', product.id);
  };

  return (
    <Link href={`/card/${product.id}`}>
      <div className="w-full cursor-pointer">
        <div className="mb-0.5 relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-30  rounded-xl"
          />
          <m.button
            whileTap={{ scale: 0.85 }}
            onClick={handleFavoriteClick}
            transition={{
              type: 'spring',

              stiffness: 300,
              damping: 10,
            }}
            className="absolute z-10 bg-white rounded-full active:bg-neutral-300 hover:bg-neutral-200 transition-colors duration-333 ease-in-out active:scale-96 px-1 py-0.5 top-0.5 right-0.5  "
          >
            <Heart color="black" width={20} hanging={20} />
          </m.button>
        </div>
        <div className="p-2">
          <div className=" font-light text-sm">
            <h2>{product.name}</h2>
          </div>
          <div>
            <p className="text-xl font-bold">${product.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
