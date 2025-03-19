"use client";

import { useEffect } from "react";
import useUserStore from '@/app/stores/userStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const restoreUser = useUserStore((state) => state.restoreUser);

  useEffect(() => {
    restoreUser();
  }, []);

  return <>{children}</>;
}
