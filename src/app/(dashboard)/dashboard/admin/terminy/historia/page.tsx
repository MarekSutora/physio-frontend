import AdminFinishedAppointmentsGrid from "@/components/dashboard/admin/appointments/AdminFinishedAppointmentsGrid";
import { getAllFinishedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { TG_BookedAppointment } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let bookedAppointments: TG_BookedAppointment[] = [];

  try {
    bookedAppointments = await getAllFinishedAppointmentsAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <AdminFinishedAppointmentsGrid bookedAppointments={bookedAppointments} />
  );
};

export default Page;
