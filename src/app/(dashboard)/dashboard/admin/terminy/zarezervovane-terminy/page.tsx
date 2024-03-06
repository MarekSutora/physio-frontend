export const dynamic = "force-dynamic";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import BookedAppointmentsGrid from "@/components/dashboard/admin/appointments/BookedAppointmentsGrid";
import { getAllBookedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { TG_BookedAppointment } from "@/lib/shared/types";
import { getErrorMessage } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import React from "react";

const Page = async () => {
  let bookedAppointments: TG_BookedAppointment[] = [];

  try {
    bookedAppointments = await getAllBookedAppointmentsAction();
  } catch (error) {
    console.error(error);
  }

  return <BookedAppointmentsGrid bookedAppointments={bookedAppointments} />;
};

export default Page;
