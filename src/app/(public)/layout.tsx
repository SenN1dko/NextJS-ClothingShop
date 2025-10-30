import { Header } from '@/components/Header';
import type { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
