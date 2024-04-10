export const dynamic = "force-dynamic";

import FinishedAppointmentsGrid from "@/components/dashboard/common/FinishedAppointmentsDataTable";
import { getAllFinishedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { TG_BookedAppointment } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let finishedAppointments: TG_BookedAppointment[] = [];

  try {
    finishedAppointments = await getAllFinishedAppointmentsAction();
  } catch (error) {
    finishedAppointments = [];
  }

  return (
    <FinishedAppointmentsGrid finishedAppointments={finishedAppointments} />
  );
};

export default Page;
