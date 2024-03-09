import React from "react";
import GeneralStatistics from "./general/GeneralStatistics";
import { TGeneralStatistics } from "@/lib/shared/types";

type Props = {
  generalStatistics: TGeneralStatistics;
};

const StatisticsWrapper = ({ generalStatistics }: Props) => {
  return <GeneralStatistics generalStatistics={generalStatistics} />;
};

export default StatisticsWrapper;
