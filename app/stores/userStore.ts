import { User } from "@prisma/client";
import { create } from "zustand";
// import { useAuthStore } from './authStore';
import { getSession, signIn, signOut } from "next-auth/react";
import { BorrowingForBorrow, CreateBorrowingReq, GLForBorrow, UserContactInfo, UserFull } from "./types";
import { userAgent } from "next/server";

export interface UserStore {
  isLoggedIn: boolean;
  user: UserFull;
  // myBorrowings: BorrowingForBorrow[];
  // login: (email: string) => Promise<boolean>;
  signIn: (email?: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (user: UserContactInfo) => void;
  update: (user: UserContactInfo) => void;
  addBorrwing:(gls:string[],locationId:string)=>void;
  // logout: () => void;
  // restoreUser: () => void;
}
const initialUser: UserFull = {
  id: "",
  name: "",
  email: "",
  phone: "",
  isAdmin: false,
  isLeader: false,
  isManager: false, 
  borrowings: [],
} as UserFull;

const useUserStore = create<UserStore>((set, get) => ({
  isLoggedIn: false,
  user: initialUser,
  // myBorrowings: [],
  // token: null,
  signUp: async (user) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.error("Failed to create user:", response.statusText);
        return;
      }
      const userData: UserFull = await response.json();
      set({ user: userData, isLoggedIn: true });
      await signIn("credentials", { email: userData.email, redirect: false });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  },
  signIn: async (email) => {
    try {
      const session = await getSession();
      if (!email && !session) return false;
      if (email && !session) {
        await signIn("credentials", { email, redirect: false });
      }
      const res = await fetch(`/api/users/me`);
      const userData = await res.json();
      set({ user: {
        ...userData,
        borrowings: userData.borrowings.map((borrowing: BorrowingForBorrow) => ({
          ...borrowing,
          rentalDate: borrowing.rentalDate ? new Date(borrowing.rentalDate) : null,
          returnDate: borrowing.returnDate ? new Date(borrowing.returnDate) : null,
          gls: borrowing.gls.map((gl: GLForBorrow) => ({
            ...gl,
            expectedReturnDate: gl.expectedReturnDate ? new Date(gl.expectedReturnDate) : null,
          })),
        })),
      }, isLoggedIn: true });
      return true;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return false;
    }
  },
  signOut: async () => {
    await signOut();
    set({ user: initialUser, isLoggedIn: false });
  },
  update: async (user) => {
    try {
      const response = await fetch(`/api/users/${get().user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.error("Failed to update user:", response.statusText);
        return;
      }
      const userData: UserFull = await response.json();
      set((state)=>({ user: {
        ...state.user,
        ...user,
      } }));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  },
  addBorrwing: async (gls,locationId) => {
    try {
      if(!get().user?.id) throw new Error("User not found");
      const data: CreateBorrowingReq = {
        gls,
        borrowId: get().user?.id,
        locationId,
      };
      const response = await fetch(`/api/borrowings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error("Failed to create borrowing:", response.statusText);
        return;
      }
      const borrowingData: BorrowingForBorrow = await response.json();
      set((state)=>({
        user: {
          ...state.user,
          borrowings: [...state.user?.borrowings, {
            ...borrowingData,
            createdAt: new Date(borrowingData.createdAt),
          }],
        },
      }));
    } catch (error) {
      console.error("Failed to create borrowing:", error);
    }
  },
}));

export default useUserStore;
