"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/stores/userStore';
import {useSession} from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const signIn = useUserStore((state) => state.signIn);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const user = useUserStore((state) => state.user);
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    try {
      const success = await signIn(email);
      console.log('success', success);
      // if (success?.ok) await fetchUser();
      if (success) router.push('/profile');
    }
    catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
//   useEffect(() => {
//     console.log('user', user,user?.isManager);
//     console.log('session', session);
// console.log('status', status);

//     if (isLoggedIn) {
//       router.push('/profile');
//     }
//   }
//   , [isLoggedIn, router]);
//   useEffect(() => {
//     console.log('user', user,user?.isManager);
//     console.log('session', session);
// console.log('status', status);

//     if (status === 'authenticated') {
//       router.push('/profile');
//     }
//   }
//   , [status, router]);

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