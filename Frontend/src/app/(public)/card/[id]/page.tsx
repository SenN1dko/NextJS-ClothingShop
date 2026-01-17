import { fetchProductById } from '@/services/cardServices';
import { PRODUCT_QUERY_KEY } from '@/services/cardServices';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { ProductClient } from './ProductClient';

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const productId = Number(id);

  try {
    const product = await fetchProductById(productId);

    return {
      title: product.name || 'Loading...',
      description: `Buy ${product.name} for $${product.price}`,
    };
  } catch (e) {
    return { title: 'Error loading product' };
  }
}

export default async function ProductPage({ params }: Params) {
  const queryClient = new QueryClient();
  const productId = Number((await params).id);

  if (isNaN(productId)) {
    notFound();
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: [PRODUCT_QUERY_KEY, productId],
      queryFn: () => fetchProductById(productId),
    });
  } catch (error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClient id={productId} />
    </HydrationBoundary>
  );
}
