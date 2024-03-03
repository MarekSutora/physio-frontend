import StatisticsWrapper from "@/components/dashboard/admin/statistics/StatisticsWrapper";
import {
  TGeneralStatistics,
  TServiceTypeStatistics,
  TRevenueStatistics,
  TNewClientsStatistics,
  TBlogPostViewsStats,
} from "@/lib/shared/types";
import React from "react";

const generateHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const generateServiceTypeStatistics = (
  serviceTypeName: string,
  hexColor: string,
): TServiceTypeStatistics[] => {
  const serviceTypeStats: TServiceTypeStatistics[] = [];
  for (let year = 2020; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      serviceTypeStats.push({
        year,
        month,
        serviceTypeName,
        finishedAppointmentsCount: Math.floor(Math.random() * 100), // Random count between 0 to 100
        hexColor,
      });
    }
  }
  return serviceTypeStats;
};

const generateRevenueStatistics = (): TRevenueStatistics[] => {
  const revenueStats: TRevenueStatistics[] = [];
  for (let year = 2020; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      revenueStats.push({
        year,
        month,
        totalRevenue: Math.floor(Math.random() * 10000), // Random revenue between 0 to 10000
      });
    }
  }
  return revenueStats;
};

const generateNewClientsStatistics = (): TNewClientsStatistics[] => {
  const newClientsStats: TNewClientsStatistics[] = [];
  for (let year = 2020; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      newClientsStats.push({
        year,
        month,
        newClientsCount: Math.floor(Math.random() * 50), // Random count between 0 to 50
      });
    }
  }
  return newClientsStats;
};

const generateBlogPostViewsStats = (): TBlogPostViewsStats[] => {
  const blogPostViewsStats: TBlogPostViewsStats[] = [];
  for (let year = 2020; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      blogPostViewsStats.push({
        year,
        month,
        viewsCount: Math.floor(Math.random() * 500), // Random count between 0 to 500
      });
    }
  }
  return blogPostViewsStats;
};

const serviceTypes = ["Service1", "Service2", "Service3"];
const serviceTypeStats: TServiceTypeStatistics[] = serviceTypes.flatMap(
  (serviceType) =>
    generateServiceTypeStatistics(serviceType, generateHexColor()),
);

const Page = async () => {
  let generalStatistics: TGeneralStatistics = {
    serviceTypeStatistics: serviceTypeStats,
    revenueStatistics: generateRevenueStatistics(),
    newClientsStatistics: generateNewClientsStatistics(),
    blogPostViewsStatistics: generateBlogPostViewsStats(),
  };

  //console.log(generalStatistics);

  return <StatisticsWrapper generalStatistics={generalStatistics} />;
};

export default Page;
