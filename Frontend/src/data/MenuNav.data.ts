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

export const MenuNav: IMenuItem[] = [
  {
    id: 1,
    title: 'Men',
    link: PAGES.MAN,
    columns: [
      {
        heading: 'Categories',
        links: ['T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Hoodies'],
      },
      {
        heading: 'Trending Brands',
        links: ['Nike', 'Jordan', 'adidas', 'New Balance', 'Zara'],
      },
    ],
  },
  {
    id: 2,
    title: 'Women',
    link: PAGES.WOMEN,
    columns: [
      {
        heading: 'Categories',
        links: ['Dresses', 'Blouses', 'Skirts', 'Coats', 'Knitwear'],
      },
      {
        heading: 'Trending Brands',
        links: ['Zara', 'H&M', 'Nike', 'Levis', 'Adidas'],
      },
    ],
  },
  {
    id: 3,
    title: 'Kids',
    link: PAGES.KIDS,
    columns: [
      {
        heading: 'Categories',
        links: ['T-Shirts', 'Dresses', 'Jeans', 'Sweaters', 'Shoes'],
      },
    ],
  },
  {
    id: 4,
    title: 'Brands',
    link: PAGES.BRANDS,
    columns: [],
  },
];
