import AppointmentsCalendar from "@/components/mainPage/appointments/AppointmentsCalendar";
import { getUnbookedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_UnbookedAppointment, TG_ServiceType } from "@/lib/shared/types";
import React from "react";

type Props = {
  columnLayout?: boolean;
};

const AppointmentsCalendarWrapper = async ({ columnLayout }: Props) => {
  let unbookedAppointmentsData: TG_UnbookedAppointment[] = [];
  let serviceTypesData: TG_ServiceType[] = [];

  try {
    unbookedAppointmentsData = await getUnbookedAppointmentsAction();
    serviceTypesData = await getServiceTypesAction();
  } catch (error) {
    console.log(error);
  }

  const [unbookedAppointments, serviceTypes] = await Promise.all([
    unbookedAppointmentsData,
    serviceTypesData,
  ]);

  return (
    <AppointmentsCalendar
      serviceTypes={serviceTypes}
      appointmentsData={unbookedAppointments}
      columnLayout={columnLayout}
    />
  );
};

export default AppointmentsCalendarWrapper;
