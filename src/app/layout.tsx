// src/app/layout.tsx
"use client";

import "nprogress/nprogress.css";  // ← 1. Import NProgress styles
import "./globals.css";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
