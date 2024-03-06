import React from "react";
import DashboardNavUl from "../DashboardNavUl";

type Props = {};

const DashboardDesktopNav = async (props: Props) => {
  return (
    <nav className="h-screen w-[240px] bg-secondary pt-[86px]">
      <DashboardNavUl />
    </nav>
  );
};

export default DashboardDesktopNav;
