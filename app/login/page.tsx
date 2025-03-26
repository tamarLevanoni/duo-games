"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/stores/userStore';
import {useAuthStore} from '@/app/stores/authStore';
import {useSession} from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    const success = await login(email);
    console.log('success', success);
    if (success) await fetchUser();
  };
  useEffect(() => {
    console.log('user', user,user?.isManager);
    console.log('session', session);
console.log('status', status);

    if (status === 'authenticated') {
      router.push('/profile');
    }
  }
  , [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Enter User Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </div>
  );
};

export default LoginPage;