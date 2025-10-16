import type { Metadata } from "next";
import "./globals.css";
import { cormorantGaramond, montserrat } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Maison Lumière",
  description: "Maison Lumière",
  icons: {
    icon: '/favicon.webp', 
    apple: '/favicon.webp',
    shortcut: '/favicon.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}