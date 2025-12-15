import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";

export const metadata: Metadata = {
  title: "CS2 Lineups",
  description: "Deviens un expert des utilitaires CS2",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
