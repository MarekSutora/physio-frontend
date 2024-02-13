"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils";
import {
  TC_AdminBookedAppointment,
  TC_Appointment,
  TG_UnbookedAppointment,
} from "../shared/types";
import { ca } from "date-fns/locale";

export async function getUnbookedAppointmentsAction(): Promise<
  TG_UnbookedAppointment[]
> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/unbooked-appointments`;

  // Make the fetch call with the Authorization header
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    //next: { tags: ["available-appointment"] },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  console.log("getAvailableAppointmentsAction", data);

  return data;
}

export async function createAppointmentAction(
  appointmentData: TC_Appointment,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/unbooked-appointments`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
    // Assuming a successful creation returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createAdminBookedAppointmentAction(
  data: TC_AdminBookedAppointment,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/admin-booked-appointments`;
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

    revalidateTag("unbooked-appointments");
    // Assuming a successful creation returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createClientBookedAppointmentAction(
  astdcId: number,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/client-booked-appointments`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify({ astdcId }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
    // Assuming a successful creation returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteAppointmentAction(
  appointmentId: number,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/${appointmentId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
    // Assuming a successful deletion returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getBookedAppointmentsAction(): Promise<TC_AdminBookedAppointment> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/booked-appointments`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function cancelBookedAppointment(
  bookedAppointmentId: number,
): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointments/booked-appointments/${bookedAppointmentId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
    // Assuming a successful deletion returns true or similar positive confirmation
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
