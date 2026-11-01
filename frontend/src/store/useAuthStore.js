import { create } from 'zustand';

// Version 1: token is kept in memory only, so a page refresh logs the user out.
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
}));
