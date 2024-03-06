import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { pages } from "next/dist/build/templates/app-page";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

//TODO redirect client to dashboard/rezervacie, admin do dashboard/prehlad

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth) {
      return NextResponse.redirect(new URL("/prihlasenie", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/prihlasenie")) {
      if (req.nextauth) {
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        return NextResponse.redirect(new URL("/prihlasenie", req.url));
      }
    }

    if (
      req.nextUrl.pathname === "/dashboard" &&
      req.nextauth.token?.user.roles.includes("Admin")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/admin/statistiky", req.url),
      );
    } else if (
      req.nextUrl.pathname === "/dashboard" &&
      req.nextauth.token?.user.roles.includes("Patient")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/klient/rezervacia", req.url),
      );
    }
  },
  {
    pages: {
      signIn: "/prihlasenie",
    },
  },
);

export const config = { matcher: ["/dashboard/:path*", "/prihlasenie"] };
