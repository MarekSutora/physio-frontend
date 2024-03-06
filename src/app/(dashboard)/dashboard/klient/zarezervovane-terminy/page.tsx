import ClientBookedAppointmentsGrid from "@/components/dashboard/common/ClientBookedAppointmentsGrid";
import { getBookedAppointmentsForClientAction } from "@/lib/actions/appointmentsActions";
import { TG_BookedAppointment } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let bookedAppointments: TG_BookedAppointment[] = [];

  try {
    bookedAppointments = await getBookedAppointmentsForClientAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <ClientBookedAppointmentsGrid bookedAppointments={bookedAppointments} />
  );
};

export default Page;
