import { PAGES } from '@/config/pages.config';

export interface IMenuItem {
  id: number;
  title: string;
  link: string;
  columns: {
    heading: string;
    links: string[];
  }[];
}

export const MenuNav = [
  {
    id: 1,
    title: 'Men',
    link: PAGES.MAN,
    columns: [
      {
        heading: 'Top 40 Lists',
        links: ['Top 40 Sneakers', 'Top 40 Shoes', 'Top 40 Apparel', 'Top 40 '],
      },
      {
        heading: 'Trending Sneaker Brands',
        links: ['Nike', 'Jordan', 'adidas', 'ASICS', 'New Balance'],
      },
      {
        heading: 'Brands to Watch',
        links: ['Louis Vuitton', 'Gucci', 'BAPE'],
      },
    ],
  },
  {
    id: 2,
    title: 'Women',
    link: PAGES.WOMEN,
    columns: [
      {
        heading: 'Top 40 Listss',
        links: [
          'Top 40 Sneakers',
          'Top 40 Shoes',
          'Top 40 ',
          'Top 40 Accessories',
        ],
      },
      {
        heading: 'Trending Sneaker Brands',
        links: ['Nike', 'Jordan', 'adidas', 'ASICS', 'New Balance'],
      },
      {
        heading: 'Brands to Watch',
        links: ['Louis Vuitton', 'Gucci', 'BAPE'],
      },
    ],
  },
  {
    id: 3,
    title: 'Kids',
    link: PAGES.KIDS,
    columns: [
      {
        heading: 'Top 40 Listsss',
        links: [
          'Top 40 Sneakers',
          'Top 40',
          'Top 40 Apparel',
          'Top 40 Accessories',
        ],
      },
      {
        heading: 'Trending Sneaker Brands',
        links: ['Nike', 'Jordan', 'adidas', 'ASICS', 'New Balance'],
      },
      {
        heading: 'Brands to Watch',
        links: ['Louis Vuitton', 'Gucci', 'BAPE'],
      },
    ],
  },

  {
    id: 4,
    title: 'Brands',
    link: PAGES.BRANDS,
    columns: [
      {
        heading: 'Top 40 Listssss',
        links: [
          'Top 40',
          'Top 40 Shoes',
          'Top 40 Apparel',
          'Top 40 Accessories',
        ],
      },
      {
        heading: 'Trending Sneaker Brands',
        links: ['Nike', 'Jordan', 'adidas', 'ASICS', 'New Balance'],
      },
      {
        heading: 'Brands to Watch',
        links: ['Louis Vuitton', 'Gucci', 'BAPE'],
      },
    ],
  },
];
