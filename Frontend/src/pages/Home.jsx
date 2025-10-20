import { Card } from '../components/Card';
import { useProducts } from '../hooks/useProducts';
import VideoComponent from '../components/VIedoComponent';
export const Home = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(products);

  return (
    <>
      <h1>Товары:</h1>
      <VideoComponent />
      <div className="flex flex-wrap gap-5 justify-center">
        {products?.map((p) => (
          <Card key={p.id} id={p.id} product={p} />
        ))}
      </div>
    </>
  );
};
