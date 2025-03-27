"use client";

import React, { Component, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/stores/userStore";
// import { useAuthStore } from "@/app/stores/authStore";
import { useSession } from "next-auth/react";
import ManagerComponent from "./components/manager";
import UserComponent from "./components/user";
import AdminComponent from "./components/admin";
import useManagerStore from "../stores/managerStore";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const signOut = useUserStore((state) => state.signOut);
  // const login = useAuthStore((state) => state.login);
  // const logout = useAuthStore((state) => state.logout);
  const [profileComponent, setProfileComponent] = useState<React.ReactNode>(null);
  // const session = useSession();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    }
  });
  const fetchManagerData = useManagerStore((state) => state.fetchManagerData);


  useEffect(() => {
    console.log("status profile", status);
    
    if(user){
      console.log("user", user);
      if (user?.isAdmin) {
        setProfileComponent(<AdminComponent />);
      } else if (user?.isManager) {
        fetchManagerData();
        setProfileComponent(<ManagerComponent />);
      } else {
        setProfileComponent(<UserComponent />);
      }
    }
  }, [user?.isManager]);
  const handleLogout = () => {
    signOut();
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
