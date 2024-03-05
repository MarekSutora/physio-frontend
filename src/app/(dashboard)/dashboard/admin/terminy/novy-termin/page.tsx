export const dynamic = "force-dynamic";

import CreateNewAppointmentForm from "@/components/dashboard/admin/appointments/CreateNewAppointmentForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import {
  TG_BookedAppointment,
  TG_PatientForBookedAppointment,
  TG_ServiceType,
} from "@/lib/shared/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import React from "react";
import { cn, getErrorMessage } from "@/lib/utils";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";

//TODO aj na mobile nechat pri tych sekciach zaokruhlene okraje, skusit spravit ten wrapper

const Page = async () => {
  let serviceTypes: TG_ServiceType[] = [];

  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvoriť nový termín"}
        width={"w-full lg:w-2/5"}
      >
        <CreateNewAppointmentForm serviceTypes={serviceTypes} />
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
