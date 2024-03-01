import { SlovakMonths } from "@/lib/shared/constants";
import { TServiceTypeMonthlyStatistics } from "@/lib/shared/types";
import { Chart } from "primereact/chart";
import React, { useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import ComboBox from "./ComboBox";

type Props = {
  serviceTypeMonthlyStats: TServiceTypeMonthlyStatistics[];
};

type YearOption = {
  id: number | "all";
  name: string;
};

const ServiceTypesMonthlyBarChart = ({ serviceTypeMonthlyStats }: Props) => {
  const currentYear = new Date().getFullYear();
  const uniqueYears = Array.from(
    new Set(serviceTypeMonthlyStats.map((stat) => stat.year)),
  ).sort((a, b) => a - b);

  const yearOptions: YearOption[] = [
    { id: "all", name: "Celé obdobie" },
    ...uniqueYears.map((year) => ({ id: year, name: year.toString() })),
  ];

  const [selectedYear, setSelectedYear] = useState<number | "all">(currentYear);

  const getChartData = () => {
    const filteredData = serviceTypeMonthlyStats.filter((stat) =>
      selectedYear === "all" ? true : stat.year === selectedYear,
    );

    const labels =
      selectedYear === "all" ? uniqueYears.map(String) : SlovakMonths;

    const dataGroupedByServiceType: { [key: string]: number[] } =
      filteredData.reduce(
        (acc, stat) => {
          const { serviceTypeName, month, year, finishedAppointmentsCount } =
            stat;
          // Map the year to a zero-based index for the "all" case
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
          serviceTypeMonthlyStats.find(
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
      y: { stacked: true },
    },
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Vykonane sluzby za dane ob</h1>
        <div className="flex flex-row items-center gap-2"></div>
        <ComboBox
          buttonText={
            selectedYear === "all" ? "Celé obdobie" : selectedYear.toString()
          }
          options={yearOptions}
          onSelect={handleYearChange}
        ></ComboBox>
      </div>
      {getChartData() && (
        <Chart type="bar" data={getChartData()} options={chartOptions} />
      )}
    </>
  );
};

export default ServiceTypesMonthlyBarChart;
