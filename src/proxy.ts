import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
  function proxy(req) {
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isLoggedIn = !!req.nextauth.token;

    if (isDashboard && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/invitations/:path*"],
};
