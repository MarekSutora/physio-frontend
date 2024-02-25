import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import BookedAppointmentsGrid from "@/components/dashboard/admin/appointments/BookedAppointmentsGrid";
import { TG_BookedAppointment } from "@/lib/shared/types";
import { getErrorMessage } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import React from "react";

async function getBookedAppointmentsAction(): Promise<TG_BookedAppointment[]> {
  "use server";
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/booked-appointments`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.text();
      console.error("errorData", errorData);
      throw new Error(errorData);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error("getBookedAppointmentsAction: " + getErrorMessage(error));
  }
}

const Page = async () => {
  let bookedAppointments: TG_BookedAppointment[] = [];

  try {
    bookedAppointments = await getBookedAppointmentsAction();
  } catch (error) {
    console.error(error);
  }

  return <BookedAppointmentsGrid bookedAppointments={bookedAppointments} />;
};

export default Page;
