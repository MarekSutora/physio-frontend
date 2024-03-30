"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { headers } from "next/headers";

export async function getTokenForServerActions() {
  const cookieStore = cookies().getAll();

  const encodedToken = cookieStore.find((cookie) =>
    cookie.name.includes("next-auth.session-token"),
  )?.value;

  if (!encodedToken) {
    return null;
  }

  const decoded = await decode({
    token: encodedToken,
    secret: `${process.env.NEXTAUTH_SECRET}`,
  });

  return decoded?.userTokens.accessToken;
}
