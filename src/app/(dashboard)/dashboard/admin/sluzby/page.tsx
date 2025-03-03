export const dynamic = "force-dynamic";

import AddServiceTypeForm from "@/components/dashboard/admin/serviceTypes/AddServiceTypeForm";
import UpdateOrDeleteServiceTypeForm from "@/components/dashboard/admin/serviceTypes/UpdateOrDeleteServiceTypeForm";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React, { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Page = async () => {
  let serviceTypes: TG_ServiceType[] = [];
  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    serviceTypes = [];
  }

  return (
    <Suspense
      fallback={
        <ClipLoader
          color={"#298294"}
          loading={true}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    >
      <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
        <DashboardSectionWrapper title="Pridať novú službu">
          <AddServiceTypeForm />
        </DashboardSectionWrapper>
        <DashboardSectionWrapper title="Upraviť/Odstrániť poskytované služby">
          <UpdateOrDeleteServiceTypeForm serviceTypes={serviceTypes} />
        </DashboardSectionWrapper>
      </div>
    </Suspense>
  );
};

export default Page;
