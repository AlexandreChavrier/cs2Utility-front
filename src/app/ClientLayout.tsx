"use client";

import { useEffect } from "react";
import useAuthStore from "@/components/auth/store/useAuthStore";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/Header";
import useMapsStore from "@/components/map/store/useMapsStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { maps, isFetching, getActiveMaps } = useMapsStore();

  useEffect(() => {
    if (!isFetching && maps.length === 0) {
      getActiveMaps();
    }
  }, []);

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
