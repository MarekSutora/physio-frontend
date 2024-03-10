import FinishedAppointmentsGrid from "@/components/dashboard/common/FinishedAppointmentsGrid";
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
    <FinishedAppointmentsGrid
      finishedAppointments={finishedBookedAppointments}
    />
  );
};

export default Page;
