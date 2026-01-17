import axios, { AxiosInstance, AxiosError } from 'axios';

const isServer = typeof window === 'undefined';

const API_BASE_URL = isServer
  ? 'http://127.0.0.1:8000/api/v1/'
  : process.env.NEXT_PUBLIC_BASE_URL || 'api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;
