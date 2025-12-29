import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";
import DictionaryProvider from "@/utils/providers/dictionaryProvider";
import { getDictionary, Locale } from "@/translations/dictionaries";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CS2Utility",
  description: "Bienvenue sur la platefrome de réérencement des lineups",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale");
  return (localeCookie?.value as Locale) || "fr";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLocale();
  const dictionary = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <ClientLayout>{children}</ClientLayout>
        </DictionaryProvider>
      </body>
    </html>
  );
}
