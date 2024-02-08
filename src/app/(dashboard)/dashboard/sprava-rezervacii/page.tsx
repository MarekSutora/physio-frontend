

import CreateNewAvailableReservationForm from "@/components/dashboard/admin/reservations/CreateNewAvailableReservationForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypeActions";
import { TServiceType } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let serviceTypes: TServiceType[] = [];
  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <section className="h-full w-full border-slate-200 bg-white p-2 md:rounded-lg md:border-2">
        <h1 className="pb-2 text-center text-xl font-medium">
          Vytvoriť nový termín
        </h1>
        <CreateNewAvailableReservationForm serviceTypes={serviceTypes} />
      </section>
      <section className="h-full w-full border-slate-200 bg-white p-2 md:rounded-lg md:border-2"></section>
    </div>
  );
};

export default Page;
