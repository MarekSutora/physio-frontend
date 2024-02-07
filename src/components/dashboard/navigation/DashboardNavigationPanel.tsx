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
      <div className="hidden h-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:block">
        <DashboardDesktopNav />
      </div>
    </>
  );
};

export default DashboardNavigationPanel;
