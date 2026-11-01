import { axiosInstance } from '../api/axiosInstance.js';

export const authService = {
  login: async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    return res.data;
  },
  logout: async () => {
    const res = await axiosInstance.post('/auth/logout');
    return res.data;
  },
  getMe: async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  },
};
