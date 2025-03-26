"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore,useLocaionsStore,useGameStore } from "../stores/stores";


export default function ClientLayout({
  children,
}:
Readonly<{
  children: React.ReactNode;
}>) {

  const fetchUser = useUserStore((state) => state.fetchUser);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  // const login = useAuthStore((state) => state.login);
  const { data: session, status } = useSession();
  useEffect(() => {
    const checkSession = async () => {
      // const success = await login();
      // console.log('success', success);
      if (status == "authenticated" && !isLoggedIn) await fetchUser(session.user.email);
    };
    checkSession();
    useGameStore.getState().fetchGames();
    useLocaionsStore.getState().fetchLocations();
  }, [status]);

  return <>{children}</>;
}
