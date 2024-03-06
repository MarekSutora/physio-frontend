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
    console.error(error);
  }

  const [unbookedAppointments, serviceTypes] = await Promise.all([
    unbookedAppointmentsData,
    serviceTypesData,
  ]);

  return (
    <DashboardSectionWrapper
      width="w-5/6"
      additionalClasses="min-h-[600px] m-auto my-4"
    >
      <AppointmentsCalendar
        appointmentsData={unbookedAppointments}
        serviceTypes={serviceTypes}
      />
    </DashboardSectionWrapper>
  );
};

export default Page;
