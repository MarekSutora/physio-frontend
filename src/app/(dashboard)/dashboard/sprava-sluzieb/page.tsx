import AddServiceTypeForm from "@/components/dashboard/admin/serviceTypes/AddServiceTypeForm";
import UpdateOrDeleteServiceTypeForm from "@/components/dashboard/admin/serviceTypes/UpdateOrDeleteServiceTypeForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypeActions";
import { DesktopDashboardSectionStyle } from "@/lib/shared/constants";
import { TG_ServiceType } from "@/lib/shared/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  let serviceTypes: TG_ServiceType[] = [];
  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
      <section className={cn("h-auto w-full", DesktopDashboardSectionStyle)}>
        <h1 className="mb-2 border-b-2 border-slate-200 pb-1 text-center text-lg font-medium">
          Upraviť/Odstrániť poskytované služby
        </h1>
        <UpdateOrDeleteServiceTypeForm serviceTypes={serviceTypes} />
      </section>
      <section className={cn("h-auto w-full", DesktopDashboardSectionStyle)}>
        <h1 className="mb-12 border-b-2 border-slate-200 pb-1 text-center text-lg font-medium">
          Pridať novú službu
        </h1>
        <AddServiceTypeForm />
      </section>
    </div>
  );
};

export default Page;
