import React, { useState } from "react";
import { Chart } from "primereact/chart";
import ComboBox from "./ComboBox";
import { SlovakMonths } from "@/lib/shared/constants";
import { TBlogPostViewsStats } from "@/lib/shared/types";

type Props = {
  blogPostViewsStats: TBlogPostViewsStats[];
};

type YearOption = {
  id: number | "all";
  name: string;
};

const BlogPostViewsStatsChart = ({ blogPostViewsStats }: Props) => {
  const currentYear = new Date().getFullYear();
  const uniqueYears = Array.from(
    new Set(blogPostViewsStats.map((stat) => stat.year)),
  ).sort((a, b) => a - b);

  const yearOptions: YearOption[] = [
    { id: "all", name: "Celé obdobie" },
    ...uniqueYears.map((year) => ({ id: year, name: year.toString() })),
  ];

  const [selectedYear, setSelectedYear] = useState<number | "all">(currentYear);

  const getChartData = () => {
    const filteredData = blogPostViewsStats.filter((stat) =>
      selectedYear === "all" ? true : stat.year === selectedYear,
    );

    const labels =
      selectedYear === "all" ? uniqueYears.map(String) : SlovakMonths;

    const data = {
      labels,
      datasets: [
        {
          label: "Blog Post Views",
          backgroundColor: "#FFCA28",
          data: labels.map((label) => {
            return selectedYear === "all"
              ? filteredData
                  .filter((stat) => stat.year.toString() === label)
                  .reduce((sum, { viewsCount }) => sum + viewsCount, 0)
              : filteredData
                  .filter((stat) => SlovakMonths[stat.month - 1] === label)
                  .reduce((sum, { viewsCount }) => sum + viewsCount, 0);
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
          text: "Views",
        },
      },
    },
  };

  const handleYearChange = (year: number | "all") => {
    setSelectedYear(year);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Blog Post Views Trend Over Time</h1>
        <ComboBox
          buttonText={
            selectedYear === "all" ? "Celé obdobie" : selectedYear.toString()
          }
          options={yearOptions}
          onSelect={handleYearChange}
        />
      </div>
      <Chart type="line" data={getChartData()} options={chartOptions} />
    </>
  );
};

export default BlogPostViewsStatsChart;
