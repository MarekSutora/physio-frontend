import React from "react";
import DashboardNavUl from "../DashboardNavUl";

type Props = {};

const DashboardDesktopNav = async (props: Props) => {
  return (
    <nav className="h-full w-[240px] bg-secondary">
      <DashboardNavUl />
    </nav>
  );
};

export default DashboardDesktopNav;
