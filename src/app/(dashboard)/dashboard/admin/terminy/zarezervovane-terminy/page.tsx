export const dynamic = "force-dynamic";

import BookedAppointmentsGrid from "@/components/dashboard/common/BookedAppointmentsDataTable";
import { getAllBookedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { TG_BookedAppointment } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let bookedAppointments: TG_BookedAppointment[] = [];

  try {
    bookedAppointments = await getAllBookedAppointmentsAction();
  } catch (error) {
    console.log(error);
  }

  return <BookedAppointmentsGrid bookedAppointments={bookedAppointments} />;
};

export default Page;
