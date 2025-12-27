"use client";

import { useEffect } from "react";
import useAuthStore from "@/components/auth/store/useAuthStore";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useSyncActionsType } from "@/components/action/hooks/useSyncActionsType";
import { useSyncMap } from "@/components/map/hooks/useSyncMap";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useSyncActionsType();
  useSyncMap();

  return (
    <>
      <Header />
      <main className="w-full flex flex-col mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
