"use client";

import React, { Component, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/stores/userStore";
import { useAuthStore } from "@/app/stores/authStore";
import { getSession } from "next-auth/react";
import ManagerComponent from "./components/manager";
import UserComponent from "./components/user";
import AdminComponent from "./components/admin";
import {useSession} from 'next-auth/react';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [profileComponent, setProfileComponent] = useState<React.ReactNode>(null);
  // const session = useSession();
  const { data: session, status } = useSession();

  // const { user, isLoggedIn, logout } = useUserStore((state) => ({
  //   user: state.user,
  //   isLoggedIn: state.isLoggedIn,
  //   logout: state.logout,
  // }));

  // const [cachedIsLoggedIn, setCachedIsLoggedIn] = useState(isLoggedIn);

  // useEffect(() => {
  //   if (!cachedIsLoggedIn) {
  //     router.push('/login'); // אם אין משתמש מחובר, מחזיר לדף ההתחברות
  //   }
  // }, [cachedIsLoggedIn, router]);

  // useEffect(() => {
  //   setCachedIsLoggedIn(isLoggedIn);
  // }, [isLoggedIn]);
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
    console.log("user", user);
    if(user){
      if (user?.isAdmin) {
        setProfileComponent(<AdminComponent />);
      } else if (user?.isManager) {
        setProfileComponent(<ManagerComponent />);
      } else {
        setProfileComponent(<UserComponent />);
      }
    }
  }, [user,status, router]);
  const handleLogout = () => {
    logout();
    clearUser();
    // router.push("/login");
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Welcome, {user?.name}</h1>
      <button
        onClick={handleLogout}
        className="p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
      {profileComponent}
    </div>
  );
};

export default ProfilePage;
