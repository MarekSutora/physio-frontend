"use client";


import { SlovakMonths } from "@/lib/shared/constants";
import { TRevenueStatistics } from "@/lib/shared/types";
import { Chart } from "primereact/chart";
import React, { useState } from "react";
import ComboBox from "./ComboBox";

type Props = {
  revenueStats: TRevenueStatistics[];
};

type YearOption = {
  id: number | "all";
  name: string;
};

const RevenueStatsChart = ({ revenueStats }: Props) => {
  const currentYear = new Date().getFullYear();
  const uniqueYears = Array.from(
    new Set(revenueStats.map((stat) => stat.year)),
  ).sort((a, b) => a - b);

  const yearOptions: YearOption[] = [
    { id: "all", name: "Celé obdobie" },
    ...uniqueYears.map((year) => ({ id: year, name: year.toString() })),
  ];

  const [selectedYear, setSelectedYear] = useState<number | "all">(currentYear);

  const getChartData = () => {
    const filteredData = revenueStats.filter((stat) =>
      selectedYear === "all" ? true : stat.year === selectedYear,
    );

    const labels =
      selectedYear === "all" ? uniqueYears.map(String) : SlovakMonths;

    const data = {
      labels,
      datasets: [
        {
          label: "Zisk (€)",
          backgroundColor: "#42A5F5",
          data: labels.map((label) => {
            return selectedYear === "all"
              ? filteredData
                  .filter((stat) => stat.year.toString() === label)
                  .reduce((sum, { totalRevenue }) => sum + totalRevenue, 0)
              : filteredData
                  .filter((stat) => SlovakMonths[stat.month - 1] === label)
                  .reduce((sum, { totalRevenue }) => sum + totalRevenue, 0);
          }),
        },
      ],
    };

    return data;
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Zisk (€)",
        },
      },
    },
  };

  const handleYearChange = (year: number | "all") => {
    setSelectedYear(year);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-row justify-between">
        <h1 className="pl-6 text-lg font-medium">Dosiahnutý zisk podľa vykonaných služieb</h1>
        <ComboBox
          buttonText={
            selectedYear === "all" ? "Celé obdobie" : selectedYear.toString()
          }
          options={yearOptions}
          onSelect={handleYearChange}
        />
      </div>
      <div className="m-auto md:w-[87%]  w-full">
        <Chart type="line" data={getChartData()} options={chartOptions} />
      </div>
    </div>
  );
};

export default RevenueStatsChart;
