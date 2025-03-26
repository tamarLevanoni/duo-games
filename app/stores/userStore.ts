import { User } from '@prisma/client';
import { create } from 'zustand';
import { useAuthStore } from './authStore';
import { getSession } from "next-auth/react"

export interface UserStore {
  // isLoggedIn: boolean;
  user: User | null;
  managerData: any | null;
  // login: (email: string) => Promise<boolean>;
  fetchUser: () => Promise<void>;
  clearUser: () => void;

  // logout: () => void;
  // restoreUser: () => void;
}

const useUserStore = create<UserStore>((set,get) => ({
  // isLoggedIn: false,
  user: null,
  // token: null,
  managerData: null,
  fetchUser: async () => {

    try {
      const session = await getSession();
      if (!session) {
        console.error("Session not found");
        return;
      }
      console.log("Session:", session);
      const email = session.user.email
      const res = await fetch(`/api/users/${email}`);
      const userData = await res.json();
      set({ user: userData });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  },
  clearUser: () => set({ user: null }),

  // login: async (email) => {
  //   try {    
  //     const response=await signIn('email', { email }); 
  //     // const response = await fetch(`/api/users/${email}`);
  //     // const userData: User = await response.json();
  //     localStorage.setItem('email', email);
  //     set({ isLoggedIn: true, user: userData, token: null });
  //     return true;
  //   } catch (error) {
  //     console.error('Failed to fetch user data:', error);
  //     return false;
  //   }
  // },
  // logout: () => {
  //   localStorage.removeItem('email');
  //   set({ isLoggedIn: false, user: null, token: null });
  // },
 
  // restoreUser: () => {
  //   const email = localStorage.getItem('email');
  //   if (email) {
  //     get().login(email);
  //   }
  // }
}));

export default useUserStore;