import React from "react";
import DashboardMobileNav from "@/components/dashboard/navigation/mobile/DashboardMobileNav";
import DashboardDesktopNav from "./desktop/DashboardDesktopNav";

type Props = {};

const DashboardNavigationPanel = (props: Props) => {
  return (
    <>
      <div>
        <div className="block md:hidden">
          <DashboardMobileNav />
        </div>
        <div className="hidden h-full bg-secondary md:block">
          <DashboardDesktopNav />
        </div>
      </div>
    </>
  );
};

export default DashboardNavigationPanel;
