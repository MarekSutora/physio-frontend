import StatisticsWrapper from "@/components/dashboard/admin/statistics/StatisticsWrapper";
import { getServiceTypeMonthlyFinishedAppointmentsCountsAction } from "@/lib/actions/statisticsActions";
import { TServiceTypeMonthlyStatistics } from "@/lib/shared/types";
import React from "react";

type Props = {};

const generateHexColor = (): string => {
  // Generate a random hex color
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const generateMonthlyStatisticsForServiceType = (
  serviceTypeName: string,
  hexColor: string,
): TServiceTypeMonthlyStatistics[] => {
  const serviceTypeMonthlyStats: TServiceTypeMonthlyStatistics[] = [];
  for (let year = 2020; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      serviceTypeMonthlyStats.push({
        year,
        month,
        serviceTypeName,
        finishedAppointmentsCount: Math.floor(Math.random() * 100), // Random count between 0 to 100
        hexColor,
      });
    }
  }
  return serviceTypeMonthlyStats;
};

const serviceTypes = ["Service1", "Service2", "Service3"];
const serviceTypeMonthlyStats: TServiceTypeMonthlyStatistics[] =
  serviceTypes.flatMap((serviceType) =>
    generateMonthlyStatisticsForServiceType(serviceType, generateHexColor()),
  );

const Page = async () => {
  //let serviceTypeMonthlyFinishedAppointmentsCounts =
  //   await getServiceTypeMonthlyFinishedAppointmentsCountsAction();

  console.log(serviceTypeMonthlyStats);

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <StatisticsWrapper serviceTypeMonthlyStats={serviceTypeMonthlyStats} />
    </div>
  );
};

export default Page;
