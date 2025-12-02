"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getTokenForServerAction() {
  const cookieStore = cookies().getAll();

  let cookieName: string;

  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV === "production") {
    cookieName = "__Secure-next-auth.session-token";
  } else {
    cookieName = "next-auth.session-token";
  }

  console.log("Using cookie name:", cookieName);

  const encodedToken = cookieStore.find(
    (cookie) => cookie.name === cookieName,
  )?.value;

  console.log("Encoded token:", encodedToken);

  if (!encodedToken) {
    return null;
  }

  const decoded = await decode({
    token: encodedToken,
    secret: `${process.env.NEXTAUTH_SECRET}`,
  });

  console.log("Decoded token:", decoded);

  if (!decoded) {
    return null;
  }

  return decoded;
}
