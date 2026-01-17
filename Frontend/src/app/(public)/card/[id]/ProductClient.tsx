'use client';

import { useProductQuery } from '@/hooks/useProductQuery';

export function ProductClient({ id }: { id: number }) {
  const { data: product, isLoading } = useProductQuery(id);

  if (isLoading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-xl w-full"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-blue-600 mb-6 font-semibold">
              {product.price} $
            </p>
            <p className="text-gray-600 leading-relaxed">{product.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
