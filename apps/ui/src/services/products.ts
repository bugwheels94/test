import { fetchWrapper } from '../utils/fetch';

export type Product = {
  id: number;

  dataCategory: string;

  name: string;

  recordCount: number;

  fields: string;
};
export const fetchProducts = async (dataCategory = '', name = '') => {
  const params = new URLSearchParams();
  if (dataCategory) params.append('dataCategory', dataCategory);
  if (name) params.append('name', name);
  return fetchWrapper<Product[]>(`/api/products?${params.toString()}`, {});
};
export const fetchProductById = async (id: string) => {
  return fetchWrapper<Product>(`/api/products/${id}`, {});
};
