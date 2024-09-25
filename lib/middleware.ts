import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const guestSession = req.cookies.get("guest-session");

  if (guestSession) {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/login") && !pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/guest-space", "/space"],
};
