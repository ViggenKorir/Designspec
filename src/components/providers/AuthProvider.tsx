"use client";

import { ReactNode } from "react";

// Try to import Clerk, but handle gracefully if not configured
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
let ClerkProvider: any = null;
let clerkLoaded = false;

try {
  const clerkModule = require("@clerk/nextjs");
  ClerkProvider = clerkModule.ClerkProvider;
  clerkLoaded = true;
} catch (error) {
  // Clerk not configured or failed to load
  clerkLoaded = false;
}
/* eslint-enable @typescript-eslint/no-var-requires */
/* eslint-enable @typescript-eslint/no-explicit-any */

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // If Clerk is loaded and configured properly, use it
  if (clerkLoaded && ClerkProvider) {
    try {
      return <ClerkProvider>{children}</ClerkProvider>;
    } catch (error) {
      console.warn("Clerk initialization failed, running in demo mode:", error);
      return <>{children}</>;
    }
  }

  // Otherwise, just render children without authentication
  return <>{children}</>;
}
