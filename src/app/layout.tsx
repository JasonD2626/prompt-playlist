// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";

// Import the Client‐only wrapper we just created:
import SessionProviderWrapper from "../components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DJ Z Playlist Generator",
  description: "AI‐powered Spotify playlist generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap all children in our Client‐only SessionProviderWrapper */}
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
