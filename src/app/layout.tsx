'use client';

import useAuthStore from '@/components/auth/store/useAuthStore';
import './globals.css';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/Header';
import Head from 'next/head';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <html lang="fr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}