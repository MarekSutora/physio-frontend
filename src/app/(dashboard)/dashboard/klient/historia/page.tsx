import ClientFinishedAppointmentsGrid from "@/components/dashboard/common/ClientFinishedAppointmentsGrid";
import { getFinishedAppointmentsForClientAction } from "@/lib/actions/appointmentsActions";
import { TG_BookedAppointment } from "@/lib/shared/types";
import { get } from "http";
import React from "react";

const Page = async () => {
  let finishedBookedAppointments: TG_BookedAppointment[] = [];

  try {
    finishedBookedAppointments = await getFinishedAppointmentsForClientAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <ClientFinishedAppointmentsGrid
      bookedAppointments={finishedBookedAppointments}
    />
  );
};

export default Page;
