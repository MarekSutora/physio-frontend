import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import { TGeneralStatistics } from "@/lib/shared/types";
import React from "react";
import ServiceTypesStatsChart from "./ServiceTypesChart";
import RevenueStatsChart from "./RevenueStatsChart";
import NewClientsTrendStatsChart from "./NewClientsTrendStatsChart";
import BlogPostViewsStatsChart from "./BlogPostViewsStatsChart";

type Props = {
  generalStatistics: TGeneralStatistics;
};

const GeneralStatistics = ({ generalStatistics }: Props) => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex  flex-col gap-2 md:h-1/2 md:w-full md:flex-row">
        <DashboardSectionWrapper width="md:w-1/2 w-full" height="h-full">
          <ServiceTypesStatsChart
            serviceTypeStats={generalStatistics.serviceTypeStatistics}
          />
        </DashboardSectionWrapper>
        <DashboardSectionWrapper width="md:w-1/2 w-full" height="h-full">
          <RevenueStatsChart
            revenueStats={generalStatistics.revenueStatistics}
          />
        </DashboardSectionWrapper>
      </div>
      <div className="flex flex-col gap-2 md:h-1/2 md:w-full md:flex-row">
        <DashboardSectionWrapper width="md:w-1/2 w-full" height="h-full">
          <NewClientsTrendStatsChart
            newClientsStats={generalStatistics.newClientsStatistics}
          />
        </DashboardSectionWrapper>
        <DashboardSectionWrapper width="md:w-1/2 w-full" height="h-full">
          <BlogPostViewsStatsChart
            blogPostViewsStats={generalStatistics.blogPostViewsStatistics}
          />
        </DashboardSectionWrapper>
      </div>
    </div>
  );
};

export default GeneralStatistics;
