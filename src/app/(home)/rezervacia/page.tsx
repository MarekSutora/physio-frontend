import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import AppointmentsCalendarWrapper from "@/components/mainPage/appointments/AppointmentsCalendarWrapper";
import React from "react";

const Page = async () => {
  return (
    <DashboardSectionWrapper
      width="w-5/6"
      additionalClasses="min-h-[600px] m-auto my-4"
    >
      <AppointmentsCalendarWrapper />
    </DashboardSectionWrapper>
  );
};

export default Page;
