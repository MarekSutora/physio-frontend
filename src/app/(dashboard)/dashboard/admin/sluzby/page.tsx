export const dynamic = "force-dynamic";

import AddServiceTypeForm from "@/components/dashboard/admin/serviceTypes/AddServiceTypeForm";
import UpdateOrDeleteServiceTypeForm from "@/components/dashboard/admin/serviceTypes/UpdateOrDeleteServiceTypeForm";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React, { Suspense } from "react";

type Props = {};

const Page = async () => {
  let serviceTypes: TG_ServiceType[] = [];
  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.log(error);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
        <DashboardSectionWrapper title="Upraviť/Odstrániť poskytované služby">
          <UpdateOrDeleteServiceTypeForm serviceTypes={serviceTypes} />
        </DashboardSectionWrapper>
        <DashboardSectionWrapper title="Pridať novú službu">
          <AddServiceTypeForm />
        </DashboardSectionWrapper>
      </div>
    </Suspense>
  );
};

export default Page;
