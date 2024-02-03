import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // if (req.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
  //   const url = req.nextUrl.clone();
  //   return NextResponse.redirect(url.origin + "/prihlasenie");
  // }

  if (req.nextUrl.pathname.startsWith("/prihlasenie") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/prihlasenie`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = { matcher: ["/dashboard/:path*"] };
