"use client";

import React, { useState } from "react";
import { Chart } from "primereact/chart";
import ComboBox from "./ComboBox";
import { SlovakMonths } from "@/lib/shared/constants";
import { TNewClientsStatistics } from "@/lib/shared/types";

type Props = {
  newClientsStats: TNewClientsStatistics[];
};

type YearOption = {
  id: number | "all";
  name: string;
};

const NewClientsTrendStatsChart = ({ newClientsStats }: Props) => {
  const currentYear = new Date().getFullYear();
  const uniqueYears = Array.from(
    new Set(newClientsStats.map((stat) => stat.year)),
  ).sort((a, b) => a - b);

  const yearOptions: YearOption[] = [
    { id: "all", name: "Celé obdobie" },
    ...uniqueYears.map((year) => ({ id: year, name: year.toString() })),
  ];

  const [selectedYear, setSelectedYear] = useState<number | "all">(currentYear);

  const getChartData = () => {
    const filteredData = newClientsStats.filter((stat) =>
      selectedYear === "all" ? true : stat.year === selectedYear,
    );

    const labels =
      selectedYear === "all" ? uniqueYears.map(String) : SlovakMonths;

    const data = {
      labels,
      datasets: [
        {
          label: "Noví klienti",
          backgroundColor: "#66BB6A",
          data: labels.map((label) => {
            return selectedYear === "all"
              ? filteredData
                  .filter((stat) => stat.year.toString() === label)
                  .reduce(
                    (sum, { newClientsCount }) => sum + newClientsCount,
                    0,
                  )
              : filteredData
                  .filter((stat) => SlovakMonths[stat.month - 1] === label)
                  .reduce(
                    (sum, { newClientsCount }) => sum + newClientsCount,
                    0,
                  );
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
        beginAtZero: true,
        title: {
          display: true,
          text: "Noví klienti",
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
        <h1 className="pl-6 text-lg font-medium">Noví klienti</h1>
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

export default NewClientsTrendStatsChart;
