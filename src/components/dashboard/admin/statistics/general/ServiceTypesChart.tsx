"use client";

import { SlovakMonths } from "@/lib/shared/constants";
import { TServiceTypeStatistics } from "@/lib/shared/types";
import { Chart } from "primereact/chart";
import React, { useState } from "react";
import ComboBox from "./ComboBox";

type Props = {
  serviceTypeStats: TServiceTypeStatistics[];
};

type YearOption = {
  id: number | "all";
  name: string;
};

const ServiceTypesStatsChart = ({ serviceTypeStats }: Props) => {
  const currentYear = new Date().getFullYear();
  const uniqueYears = Array.from(
    new Set(serviceTypeStats.map((stat) => stat.year)),
  ).sort((a, b) => a - b);

  const yearOptions: YearOption[] = [
    { id: "all", name: "Celé obdobie" },
    ...uniqueYears.map((year) => ({ id: year, name: year.toString() })),
  ];

  const [selectedYear, setSelectedYear] = useState<number | "all">(currentYear);

  const getChartData = () => {
    const filteredData = serviceTypeStats.filter((stat) =>
      selectedYear === "all" ? true : stat.year === selectedYear,
    );

    const labels =
      selectedYear === "all" ? uniqueYears.map(String) : SlovakMonths;

    const dataGroupedByServiceType: { [key: string]: number[] } =
      filteredData.reduce(
        (acc, stat) => {
          const { serviceTypeName, month, year, finishedAppointmentsCount } =
            stat;
          const yearIndex = uniqueYears.indexOf(year);
          const index = selectedYear === "all" ? yearIndex : month - 1;
          if (!acc[serviceTypeName]) {
            acc[serviceTypeName] = Array(
              selectedYear === "all" ? uniqueYears.length : 12,
            ).fill(0);
          }
          acc[serviceTypeName][index] += finishedAppointmentsCount;
          return acc;
        },
        {} as { [key: string]: number[] },
      );

    const datasets = Object.entries(dataGroupedByServiceType).map(
      ([serviceTypeName, counts]) => {
        const color =
          serviceTypeStats.find(
            (stat) => stat.serviceTypeName === serviceTypeName,
          )?.hexColor || "#000000";
        return {
          label: serviceTypeName,
          backgroundColor: color,
          data: counts,
        };
      },
    );

    return {
      labels,
      datasets,
    };
  };

  const handleYearChange = (year: number | "all") => {
    setSelectedYear(year);
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Počet vykonaných služieb",
        },
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-row justify-between">
        <h1 className="pl-6 text-lg font-medium">Poskytnuté služby</h1>
        <ComboBox
          buttonText={
            selectedYear === "all" ? "Celé obdobie" : selectedYear.toString()
          }
          options={yearOptions}
          onSelect={handleYearChange}
        ></ComboBox>
      </div>
      <div className="m-auto md:w-[87%] w-full">
        <Chart
          type="bar"
          data={getChartData()}
          options={chartOptions}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default ServiceTypesStatsChart;
