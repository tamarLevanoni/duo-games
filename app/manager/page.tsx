"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/stores/userStore';
import BorrowingManagement from './components/BorrowingManagement';
import AddBorrowing from './components/AddBorrowing';
import GameAvailability from './components/GameAvailability';
import InventoryManagement from './components/InventoryManagement';
import { useState } from 'react';
import { Tabs } from '@radix-ui/themes';
// import { Tab } from '@headlessui/react';

const ManagerPage = () => {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const managerData = useUserStore((state) => state.managerData);
  const fetchManagerData = useUserStore((state) => state.fetchManagerData);

  useEffect(() => {
    if (user) {
      fetchManagerData(user.id);
    }
  }, [user, fetchManagerData]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const tabs = [
    { name: 'Borrowing Management', component: <BorrowingManagement /> },
    { name: 'Add Borrowing', component: <AddBorrowing /> },
    { name: 'Game Availability', component: <GameAvailability /> },
    { name: 'Inventory Management', component: <InventoryManagement /> },
  ];
  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">Manager Page</h1>
        <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded mb-4">
          Logout
        </button>
        <Tabs.Root defaultValue="Borrowing Management">
            <Tabs.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {tabs.map((tab) => (
                <Tabs.Trigger key={tab.name} value={tab.name} className="w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg">
                    {tab.name}
                </Tabs.Trigger>
                ))} 
            </Tabs.List>
            {tabs.map((tab,i) => (
            <Tabs.Content key={i} value={tab.name}>
                {tab.component}
            </Tabs.Content>
                ))}
        </Tabs.Root>         
      </div>
  );
};

export default ManagerPage;