import { useProductsQuery } from '@/hooks/useProductsQuery';

export const AllProducts = () => {
  const { data, error, isLoading, isError } = useProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return <></>;
};
