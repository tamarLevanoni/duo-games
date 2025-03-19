"use client";

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/stores/userStore';

const ProfilePage = () => {
  const router = useRouter();
  const user=useUserStore((state)=>state.user);
  const isLoggedIn=useUserStore((state)=>state.isLoggedIn);
  const logout=useUserStore((state)=>state.logout);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('User is not logged in');
      
      router.push('/login');
    }
  }
  , [isLoggedIn, router]);
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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Welcome, {user?.name}</h1>
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
