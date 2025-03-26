"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/stores/userStore";
import BorrowingManagement from "./BorrowingManagement";
import AddBorrowing from "./AddBorrowing";
import GameAvailability from "./GameAvailability";
import InventoryManagement from "./InventoryManagement";
import { useState } from "react";
import { Tabs } from "@radix-ui/themes";
import useManagerStore from "@/app/stores/managerStore";
import { useAuthStore } from "@/app/stores/authStore";

// import { Tab } from '@headlessui/react';

const ManagerComponent = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const fetchManagerData = useManagerStore((state) => state.fetchManagerData);

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        await fetchManagerData(user.id);
      };
      fetchData();
    }
  }, [user, fetchManagerData]);

  const tabs = [
    { key: 1, name: "ניהול השאלות", component: <BorrowingManagement /> },
    { key: 2, name: "הוספת השאלה", component: <AddBorrowing /> },
    { key: 3, name: "ניהול משחקים", component: <GameAvailability /> },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Manager Page</h1>
      <Tabs.Root defaultValue={tabs[0].name}>
        <Tabs.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.key}
              value={tab.name}
              className="w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg"
            >
              {tab.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((tab, i) => (
          <Tabs.Content key={i} value={tab.name}>
            {tab.component}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

export default ManagerComponent;
