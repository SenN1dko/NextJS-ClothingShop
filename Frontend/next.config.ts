import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Автономный вывод: в образ попадают только реально нужные файлы
  // и зависимости, поэтому node_modules можно не копировать целиком.
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  // Проксируем запросы к бэкенду, чтобы в браузере обращаться
  // к тому же origin и не зависеть от CORS.
  async rewrites() {
    const target = process.env.API_INTERNAL_URL ?? 'http://127.0.0.1:8000';

    return [
      { source: '/api/v1/:path*', destination: `${target}/api/v1/:path*` },
    ];
  },
};

export default nextConfig;
