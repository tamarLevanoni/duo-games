import { User } from "@prisma/client";
import { create } from "zustand";
// import { useAuthStore } from './authStore';
import { getSession, signIn, signOut } from "next-auth/react";
import { BorrowingForBorrow, CreateBorrowingReq, UserContactInfo, UserFull } from "./types";
import { userAgent } from "next/server";

export interface UserStore {
  isLoggedIn: boolean;
  user: UserFull | null;
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

const useUserStore = create<UserStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
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
      set({ user: userData, isLoggedIn: true });
      return true;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return false;
    }
  },
  signOut: async () => {
    await signOut();
    set({ user: null, isLoggedIn: false });
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
      set({ user: userData });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  },
  addBorrwing: async (gls,locationId) => {
    try {
      if(!get().user) throw new Error("User not found");
      const response = await fetch(`/api/borrowings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({gls,borrowId:get().user?.id,locationId}),
      });
      if (!response.ok) {
        console.error("Failed to create borrowing:", response.statusText);
        return;
      }
      const borrowingData: BorrowingForBorrow = await response.json();
      set({
        user: {
          ...get().user!,
          borrowings: [...(get().user?.borrowings || []), borrowingData],
        },
      });
    } catch (error) {
      console.error("Failed to create borrowing:", error);
    }
  },
}));

export default useUserStore;
