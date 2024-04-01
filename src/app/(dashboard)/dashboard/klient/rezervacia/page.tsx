export const dynamic = "force-dynamic";

import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
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
    console.log(error);
  }

  const [unbookedAppointments, serviceTypes] = await Promise.all([
    unbookedAppointmentsData,
    serviceTypesData,
  ]);

  return (
    <DashboardSectionWrapper>
      <AppointmentsCalendar
        appointmentsData={unbookedAppointments}
        serviceTypes={serviceTypes}
      />
    </DashboardSectionWrapper>
  );
};

export default Page;
