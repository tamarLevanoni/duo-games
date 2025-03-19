"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/stores/userStore';

const LoginPage = () => {
  const [userName, setuserName] = useState('');
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);

  const handleLogin = async () => {
    const isLogin = await login(userName);
    // if (isLogin) {
    //   console.log('user', user,user?.isManager);
      
    //   if (user?.isAdmin) {
    //     router.push('/admin'); // Redirect to admin page
    //   } else if (user?.isManager) {
    //     router.push('/manager'); // Redirect to manager page
    //   } else {
    //     router.push('/profile'); // Redirect to profile page for regular users
    //   }
    // }
  };
  useEffect(() => {
    console.log('user', user,user?.isManager);
    if (user) {
      if (user.isAdmin) {
        router.push('/admin');
      } else if (user.isManager) {
        router.push('/manager');
      } else {
        router.push('/profile');
      }
    }
  }
  , [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Enter User Name"
        value={userName}
        onChange={(e) => setuserName(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </div>
  );
};

export default LoginPage;