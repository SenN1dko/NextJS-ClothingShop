import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow  mx-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
