import AppointmentsCalendar from "@/components/mainPage/appointments/AppointmentsCalendar";
import { getUnbookedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_UnbookedAppointment, TG_ServiceType } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let unbookedAppointmentsData: TG_UnbookedAppointment[] = [];
  let serviceTypesData: TG_ServiceType[] = [];

  try {
    unbookedAppointmentsData = await getUnbookedAppointmentsAction();
    serviceTypesData = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  const [unbookedAppointments, serviceTypes] = await Promise.all([
    unbookedAppointmentsData,
    serviceTypesData,
  ]);

  return (
    <AppointmentsCalendar
      appointments={unbookedAppointments}
      serviceTypes={serviceTypes}
    />
  );
};

export default Page;
