import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicAuthPath = pathname === "/login" || pathname === "/";

  const isProtectedPath =
    pathname.startsWith("/history") ||
    pathname.startsWith("/camera") ||
    pathname.startsWith("/result");

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicAuthPath && token) {
    return NextResponse.redirect(new URL("/history", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|image).*)",
  ],
};
