import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';

import './globals.css';
import { Providers } from '@/providers/Providers';

const grotesk = Bricolage_Grotesque({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dressly — интернет-магазин одежды',
    template: '%s | Dressly',
  },
  description:
    'Dressly: каталог одежды для мужчин, женщин и детей. Доставка и возврат.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${grotesk.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
