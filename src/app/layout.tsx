import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Maison Lumière",
  description: "Maison Lumière",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
