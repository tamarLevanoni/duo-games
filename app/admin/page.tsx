"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/stores/userStore';

const AdminPage = () => {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Admin Page</h1>
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default AdminPage;