import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { pages } from "next/dist/build/templates/app-page";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

//TODO redirect client to dashboard/rezervacie, admin do dashboard/prehlad

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth);

    if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth) {
      return NextResponse.redirect(new URL("/prihlasenie", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/prihlasenie")) {
      console.log("prihlasenie");
      if (req.nextauth) {
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        console.log("no auth");
        return NextResponse.redirect(new URL("/prihlasenie", req.url));
      }
    }

    if (
      req.nextUrl.pathname === "/dashboard" &&
      req.nextauth.token?.user.roles.includes("Admin")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/admin/prehlad", req.url),
      );
    } else if (
      req.nextUrl.pathname === "/dashboard" &&
      req.nextauth.token?.user.roles.includes("Patient")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/client/rezervacie", req.url),
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
