import { User } from '@prisma/client';
import { create } from 'zustand';

export interface UserStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  managerData: any | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  restoreUser: () => void;
}

const useUserStore = create<UserStore>((set,get) => ({
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
 
  restoreUser: () => {
    const email = localStorage.getItem('email');
    if (email) {
      get().login(email);
    }
  }
}));

export default useUserStore;