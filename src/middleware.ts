import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


  if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/prihlasenie", req.nextUrl.origin));
  }

  if (req.nextUrl.pathname.startsWith("/prihlasenie") && token) {
    const redirectUrl = token.user.roles.includes("Admin")
      ? "/dashboard/admin/statistiky"
      : "/dashboard/klient/rezervacia";
    return NextResponse.redirect(new URL(redirectUrl, req.nextUrl.origin));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard/admin") &&
    token &&
    token.user.roles.includes("Client")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/klient/rezervacia", req.nextUrl.origin),
    );
  }

  if (
    req.nextUrl.pathname === "/dashboard" &&
    token &&
    token.user.roles.includes("Admin")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/admin/statistiky", req.nextUrl.origin),
    );
  }

  if (
    req.nextUrl.pathname === "/dashboard" &&
    token &&
    token.user.roles.includes("Client")
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/klient/rezervacia", req.nextUrl.origin),
    );
  }
}

export const config = { matcher: ["/dashboard/:path*", "/prihlasenie"] };
