export const dynamic = "force-dynamic";

import CreateNewAppointmentForm from "@/components/dashboard/admin/appointments/CreateNewAppointmentForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React from "react";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import AppointmentsCalendar from "@/components/mainPage/appointments/AppointmentsCalendar";
import AppointmentsCalendarWrapper from "@/components/mainPage/appointments/AppointmentsCalendarWrapper";

//TODO aj na mobile nechat pri tych sekciach zaokruhlene okraje, skusit spravit ten wrapper

const Page = async () => {
  let serviceTypes: TG_ServiceType[] = [];

  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex h-full max-h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvoriť nový termín"}
        width={"w-full lg:w-2/5"}
        height="h-full max-h-full"
      >
        <CreateNewAppointmentForm serviceTypes={serviceTypes} />
      </DashboardSectionWrapper>
      <DashboardSectionWrapper
        title={"Zoznam termínov"}
        width={"w-full lg:w-3/5"}
        height="h-auto max-h-full"
      >
        <AppointmentsCalendarWrapper columnLayout={true} />
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
