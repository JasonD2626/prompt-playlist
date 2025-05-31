// src/components/SessionProviderWrapper.tsx
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function SessionProviderWrapper({ children }: Props) {
  // You can pass additional NextAuth options here if desired.
  return <SessionProvider>{children}</SessionProvider>;
}
