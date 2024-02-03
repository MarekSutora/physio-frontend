"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function getAvailableReservationsAction() {
  // Obtain the session from getServerSession
  const session = await getServerSession(authOptions);

  // Construct the request URL
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservations/available-reservations`;

  // Make the fetch call with the Authorization header
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.backendTokens.accessToken}`,
    },
    next: { tags: ["available-reservations"] },
  });

  // If the fetch was unsuccessful, throw an error
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  // Parse the JSON response
  const data = await res.json();
  return data;
}
