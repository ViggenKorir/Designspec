"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/constants";

// This component provides a fallback UI when Clerk is not configured
// It can be replaced with actual Clerk components when credentials are set up

export function AuthButtons({ mobile = false }: { mobile?: boolean }) {
  const buttonClass = mobile ? "w-full" : "";

  return (
    <div className={mobile ? "space-y-2" : "flex items-center gap-4"}>
      <Link href={ROUTES.LOGIN}>
        <Button variant="ghost" size="sm" className={buttonClass}>
          Sign In
        </Button>
      </Link>
      <Link href={ROUTES.REGISTER}>
        <Button size="sm" className={buttonClass}>
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export function DashboardButton({ mobile = false }: { mobile?: boolean }) {
  const buttonClass = mobile ? "w-full" : "";

  return (
    <Link href={ROUTES.DASHBOARD}>
      <Button variant="ghost" size="sm" className={buttonClass}>
        Dashboard
      </Button>
    </Link>
  );
}
