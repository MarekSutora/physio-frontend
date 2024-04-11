

import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import AppointmentsCalendarWrapper from "@/components/mainPage/appointments/AppointmentsCalendarWrapper";
import React from "react";

export const metadata = {
  title: "Rezervácia",
  description:
    "Na tejto stránke si môžete rezervovať termín na vyšetrenie v prípade, že ste prihlásený.",
};

const Page = () => {
  return (
    <div className="flex h-full min-h-[600px] items-center justify-center md:p-7">
      <DashboardSectionWrapper width="md:w-5/6 w-11/12">
        <AppointmentsCalendarWrapper />
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
