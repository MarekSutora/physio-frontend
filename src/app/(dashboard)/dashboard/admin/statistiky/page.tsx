import StatisticsWrapper from "@/components/dashboard/admin/statistics/StatisticsWrapper";
import {
  getBlogPostViewsStatsAction,
  getNewClientsTrendAction,
  getServiceTypeFinishedAppointmentsCountsAction,
  getTotalRevenueStatisticsAction,
} from "@/lib/actions/statisticsActions";
import {
  TGeneralStatistics,
  TServiceTypeStatistics,
  TRevenueStatistics,
  TNewClientsStatistics,
  TBlogPostViewsStats,
} from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let serviceTypeStats: TServiceTypeStatistics[] = [];
  let revenueStatistics: TRevenueStatistics[] = [];
  let newClientsStatistics: TNewClientsStatistics[] = [];
  let blogPostViewsStatistics: TBlogPostViewsStats[] = [];

  try {
    serviceTypeStats = await getServiceTypeFinishedAppointmentsCountsAction();
  } catch (error) {
    serviceTypeStats = [];
  }

  try {
    revenueStatistics = await getTotalRevenueStatisticsAction();
  } catch (error) {
    revenueStatistics = [];
  }

  try {
    newClientsStatistics = await getNewClientsTrendAction();
  } catch (error) {
    newClientsStatistics = [];
  }

  try {
    blogPostViewsStatistics = await getBlogPostViewsStatsAction();
  } catch (error) {
    blogPostViewsStatistics = [];
  }

  let generalStatistics: TGeneralStatistics = {
    serviceTypeStatistics: serviceTypeStats,
    revenueStatistics: revenueStatistics,
    newClientsStatistics: newClientsStatistics,
    blogPostViewsStatistics: blogPostViewsStatistics,
  };

  return <StatisticsWrapper generalStatistics={generalStatistics} />;
};

export default Page;
