'use client';

import { useProductQuery } from '@/hooks/useProductQuery';
import { useParams } from 'next/navigation';
export default function Page() {
  const { id } = useParams();
  const productId = Number(id);
  const { data, error, isLoading, isError } = useProductQuery(productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    if ((error as any).statusCode === 404) {
      return <div>Товара с таким ID не существует</div>;
    }
    return <div>Ошибка: {(error as any).message}</div>;
  }

  return (
    <div>
      {data?.name}
      <p>{data?.price}</p>
    </div>
  );
}
