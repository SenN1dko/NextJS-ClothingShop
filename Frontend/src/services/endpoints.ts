import apiClient from '@/lib/apiClient';
import { IProducts } from '@/types/card.type';

export class ENDPOINTS {
  getProducts(): Promise<IProducts[]> {
    return apiClient
      .get<IProducts[]>('/products')
      .then((response) => response.data);
  }
}
export const Endpoints = new ENDPOINTS();
