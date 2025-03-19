import { User } from '@prisma/client';
import { create } from 'zustand';

export interface AdminStore {
  users: User[];
  addNewUser: (user: User) => Promise<void>;
  getUsers: () => Promise<void>;
}

const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  addNewUser: async (user) => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const userData: User = await response.json();
      set((state) => ({ users: [...state.users, userData] }));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw new Error('Failed to add user');
    }
  },
  getUsers: async () => {
    try {
      const response = await fetch(`/api/users`);
      const users: User[] = await response.json();
      set({ users });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  },
}));

export default useAdminStore;