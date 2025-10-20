import axios from 'axios';
export const fetchProducts = async () => {
  const res = await axios.get('http://localhost:3000/products');

  return res.data;
};
// https://fakestoreapi.com/products
