import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { PRODUCT_QUERY_KEY, fetchProductById } from '@/services/cardServices';
import { toApiError } from '@/lib/apiClient';

import { ProductClient } from './ProductClient';

interface Params {
  params: Promise<{ id: string }>;
}

/** Приводит сегмент маршрута к положительному id или отдаёт 404. */
async function resolveId(raw: string): Promise<number> {
  const id = Number(raw);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  return id;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const productId = await resolveId(id);

  try {
    const product = await fetchProductById(productId);

    return {
      title: product.name,
      description: product.description.slice(0, 160) || product.name,
      openGraph: {
        title: product.name,
        images: [{ url: product.image_url }],
      },
    };
  } catch {
    return { title: 'Товар не найден' };
  }
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const productId = await resolveId(id);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
  });

  // fetchQuery пробрасывает ошибку, в отличие от prefetchQuery,
  // который молча складывает её в состояние запроса.
  try {
    await queryClient.fetchQuery({
      queryKey: [PRODUCT_QUERY_KEY, productId],
      queryFn: () => fetchProductById(productId),
    });
  } catch (error) {
    if (toApiError(error).statusCode === 404) {
      notFound();
    }
    // Прочие ошибки отдаём клиенту: он покажет экран с повтором.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClient id={productId} />
    </HydrationBoundary>
  );
}
