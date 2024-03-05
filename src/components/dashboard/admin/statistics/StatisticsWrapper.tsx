"use client";

import React, { useState } from "react";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralStatistics from "./general/GeneralStatistics";
import { TGeneralStatistics } from "@/lib/shared/types";

type Props = {
  generalStatistics: TGeneralStatistics;
};

const StatisticsWrapper = ({ generalStatistics }: Props) => {
  const [sectionToggled, setSectionToggled] = useState<string>("sectionOne");

  return (
    <>
      {/* <DashboardSectionWrapper width="w-full" height="h-auto">
        <div className="flex flex-row gap-2">
          <Button
            className={cn(
              sectionToggled === "sectionOne"
                ? "border-gray-600 bg-white text-gray-700 transition-all duration-200 ease-in-out hover:border-gray-700 hover:bg-gray-100 hover:text-gray-800"
                : "border-gray-900 bg-gray-900 text-white transition-all duration-200 ease-in-out hover:border-gray-600 hover:bg-white hover:text-gray-600",
              "rounded-lg border-2 px-2 py-1 text-sm font-medium",
            )}
            onClick={() => setSectionToggled("sectionOne")}
          >
            Vseobecne
          </Button>
          <Button
            className={cn(
              sectionToggled === "sectionTwo"
                ? "border-gray-600 bg-white text-gray-700 transition-all duration-200 ease-in-out hover:border-gray-700 hover:bg-gray-100 hover:text-gray-800"
                : "border-gray-900 bg-gray-900 text-white transition-all duration-200 ease-in-out hover:border-gray-600 hover:bg-white hover:text-gray-600",
              "rounded-lg border-2 px-2 py-1 text-sm font-medium",
            )}
            onClick={() => setSectionToggled("sectionTwo")}
          >
            Prehlad
          </Button>
        </div>
      </DashboardSectionWrapper> */}
      <div className="h-full w-full">
        {sectionToggled === "sectionOne" && (
          <GeneralStatistics generalStatistics={generalStatistics} />
        )}
        {sectionToggled === "sectionTwo" && (
          <DashboardSectionWrapper width="w-full">
            <h1>Section Two</h1>
          </DashboardSectionWrapper>
        )}
      </div>
    </>
  );
};

export default StatisticsWrapper;
