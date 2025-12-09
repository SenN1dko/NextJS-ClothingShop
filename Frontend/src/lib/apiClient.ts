import axios, { AxiosInstance, AxiosError } from 'axios';
import { IApiError } from '@/types/card.type';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError: IApiError = {
      message: error.message,
      statusCode: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;
