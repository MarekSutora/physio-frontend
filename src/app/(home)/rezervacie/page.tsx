import AppointmentsCalendar from "@/components/mainPage/appointments/AppointmentsCalendar";
import { getUnbookedAppointmentsAction } from "@/lib/actions/appointmentsActions";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_UnbookedAppointment, TG_ServiceType } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let unbookedAppointments: TG_UnbookedAppointment[] = [];
  try {
    unbookedAppointments = await getUnbookedAppointmentsAction();
  } catch (error) {
    console.error(error);
  }

  let serviceTypes: TG_ServiceType[] = [];
  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="m-auto min-h-[600px] w-5/6 py-2 lg:p-8">
      <AppointmentsCalendar
        appointments={unbookedAppointments}
        serviceTypes={serviceTypes}
      />
    </section>
  );
};

export default Page;
