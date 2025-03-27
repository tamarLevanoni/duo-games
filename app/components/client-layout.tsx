"use client";

import { use, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore, useLocaionsStore, useGameStore } from "../stores/stores";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signIn = useUserStore((state) => state.signIn);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  // const login = useAuthStore((state) => state.login);
  const { data: session, status } = useSession();
  useEffect(() => {
    useGameStore.getState().fetchGames();
    useLocaionsStore.getState().fetchLocations();
    // useGameStore.persist.rehydrate();
    // useLocaionsStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      if (status == "authenticated" && !isLoggedIn) await signIn();
      if (status == "unauthenticated" && isLoggedIn)
        useUserStore.getState().signOut();
    };
    checkSession();
    return () => {

    };  
  }, [status]);

  return <>{children}</>;
}
