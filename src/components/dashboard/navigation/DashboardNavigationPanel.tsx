import React from "react";
import DashboardMobileNav from "@/components/dashboard/navigation/mobile/DashboardMobileNav";
import DashboardDesktopNav from "./desktop/DashboardDesktopNav";

type Props = {};

const DashboardNavigationPanel = (props: Props) => {
  return (
    <>
      <div className="block md:hidden">
        <DashboardMobileNav />
      </div>
      <div className="hidden h-full md:block pt-3 pl-3 pb-3">
        <DashboardDesktopNav />
      </div>
    </>
  );
};

export default DashboardNavigationPanel;
