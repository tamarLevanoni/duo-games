import { User } from '@prisma/client';
import { create } from 'zustand';

export interface UserStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  managerData: any | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  fetchManagerData: (id: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  managerData: null,
  login: async (email) => {
    try {
      const response = await fetch(`/api/users/${email}`);
      const userData: User = await response.json();
      localStorage.setItem('email', email);
      set({ isLoggedIn: true, user: userData, token: null });
      return true;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('email');
    set({ isLoggedIn: false, user: null, token: null });
  },
  fetchManagerData: async (id) => {
    try {
      const response = await fetch(`/api/manager/${id}`);
      const data = await response.json();
      set({ managerData: data });
    } catch (error) {
      console.error('Failed to fetch manager data:', error);
    }
  },
}));

export default useUserStore;