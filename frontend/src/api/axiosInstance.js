import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore.js';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.status, error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);
