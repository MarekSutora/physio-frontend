"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils";
import {
  TC_AdminBookedReservation,
  TC_AvailableReservation,
  TG_AvailableReservation,
} from "../shared/types";

export async function getAvailableReservationsAction(): Promise<
  TG_AvailableReservation[]
> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservations/available-reservations`;

  // Make the fetch call with the Authorization header
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    //next: { tags: ["available-reservations"] },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  console.log("getAvailableReservationsAction", data);

  return data;
}

export async function createAvailableReservationAction(
  reservationData: TC_AvailableReservation,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservations/available-reservations`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("available-reservations");
    // Assuming a successful creation returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createAdminBookedReservationAction(
  data: TC_AdminBookedReservation,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservations/admin-booked-reservations`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("available-reservations");
    // Assuming a successful creation returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createClientBookedReservationAction(
  userId: string,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservations/client-booked-reservations`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("available-reservations");
    // Assuming a successful creation returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
