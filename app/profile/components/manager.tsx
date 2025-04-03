"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/stores/userStore";
import BorrowingManagement from "./manager/BorrowingManagement";
import AddBorrowing from "./manager/AddBorrowing";
import GameAvailability from "./manager/GameAvailability";
import InventoryManagement from "./InventoryManagement";
import { useState } from "react";
import { Tabs } from "@radix-ui/themes";
import useManagerStore from "@/app/stores/managerStore";
// import { useAuthStore } from "@/app/stores/authStore";

// import { Tab } from '@headlessui/react';

const ManagerComponent = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const fetchManagerData = useManagerStore((state) => state.fetchManagerData);
  const leader = useManagerStore((state) => state.leader);
  const locationName = useManagerStore((state) => state.locationName);

  const tabs = [
    { key: 1, name: "ניהול השאלות", component: <BorrowingManagement /> },
    { key: 2, name: "הוספת השאלה", component: <AddBorrowing /> },
    { key: 3, name: "ניהול משחקים", component: <GameAvailability /> },
  ];
  return (
    <div className="p-4 space-y-6 text-right">
    <h1 className="text-2xl font-bold">איזור רכז מוקד</h1>

    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">פרטים אישיים</h2>
      <p>שם: {user?.name}</p>
      <p>שם מוקד: {locationName}</p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">עדכון פרטים</button>
    </div>

    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">פרטי רכז על</h2>
      <p>שם: {leader?.name}</p>
      <p>טלפון: {leader?.phone}</p>
      <p>מייל: {leader?.email}</p>
    </div>
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">הוספת השאלה</h2>
      <AddBorrowing />
    </div>


    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">ניהול השאלות</h2>
      <BorrowingManagement />
    </div>

    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">ניהול זמינות המשחקים</h2>
      <GameAvailability />
    </div>

    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">רשימת השאלות האישית</h2>
      <InventoryManagement />
    </div>
  </div>
  );
};

export default ManagerComponent;
