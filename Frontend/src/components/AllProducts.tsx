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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-6">
        {data?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
