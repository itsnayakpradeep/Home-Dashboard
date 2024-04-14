import axios from 'axios';
import { Category } from './types';
import { Product } from './types';

const API_URL = 'https://dummyjson.com';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data.map((title: string) => ({ title })) as Category[];
};

export const fetchProducts = async (category: string) => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data.products as Product[];
};