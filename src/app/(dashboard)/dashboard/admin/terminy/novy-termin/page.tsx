export const dynamic = "force-dynamic";

import CreateNewAppointmentForm from "@/components/dashboard/admin/appointments/CreateNewAppointmentForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React from "react";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";

const Page = async () => {
  let serviceTypes: TG_ServiceType[] = [];

  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    serviceTypes = [];
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
    </div>
  );
};

export default Page;
