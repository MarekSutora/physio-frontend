import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import { TServiceTypeMonthlyStatistics } from "@/lib/shared/types";
import React from "react";
import ServiceTypesMonthlyBarChart from "./ServiceTypesMonthlyBarChart";

type Props = {
  serviceTypeMonthlyStats: TServiceTypeMonthlyStatistics[];
};

const GeneralStatistics = ({ serviceTypeMonthlyStats }: Props) => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-full w-full flex-row gap-2">
        <DashboardSectionWrapper width="w-full h-full">
          <ServiceTypesMonthlyBarChart
            serviceTypeMonthlyStats={serviceTypeMonthlyStats}
          />
        </DashboardSectionWrapper>
        <DashboardSectionWrapper width="w-full h-full">
          asd
        </DashboardSectionWrapper>
      </div>
      <div className="flex h-full w-full flex-row gap-2">
        <DashboardSectionWrapper width="w-full h-full">
          asd
        </DashboardSectionWrapper>
        <DashboardSectionWrapper width="w-full h-full">
          asd
        </DashboardSectionWrapper>
      </div>
    </div>
  );
};

export default GeneralStatistics;
