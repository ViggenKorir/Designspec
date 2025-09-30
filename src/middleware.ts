import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware that works with or without Clerk
// When Clerk is properly configured, it will handle authentication
// Otherwise, it allows all requests through for demo purposes

export function middleware(_request: NextRequest) {
  // For now, allow all requests through
  // This enables the app to run without Clerk credentials
  // When you add real Clerk credentials, replace this with clerkMiddleware

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
