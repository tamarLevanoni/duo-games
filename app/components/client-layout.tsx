"use client";

import { useEffect } from "react";
import useUserStore from '@/app/stores/userStore';
import {useAuthStore} from '@/app/stores/authStore';
import { getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function ClientLayout({
  children,
  // session
}: Readonly<{
  children: React.ReactNode;
  // session: any; // type this properly for your session data
}>) {
  // const restoreUser = useUserStore((state) => state.restoreUser);
  const { isLoggedIn, token } = useAuthStore();
  const fetchUser = useUserStore((state) => state.fetchUser);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const checkSession = async () => {
      const success = await login();
      console.log('success', success);
      if (success) await fetchUser();
    };
    checkSession();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
