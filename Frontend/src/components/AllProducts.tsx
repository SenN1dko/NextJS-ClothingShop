'use client';

import { useProductsQuery } from '@/hooks/useProductsQuery';
import { Product } from './Product';
export const AllProducts = () => {
  const { data, error, isLoading, isError } = useProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <div className="flex items-center gap-5">
        {data?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
