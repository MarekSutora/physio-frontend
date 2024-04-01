import React from "react";
import DashboardNavUl from "../DashboardNavUl";
import Link from "next/link";
import LogoText from "@/components/mainPage/common/logo/LogoText";
import LogoutButton from "@/components/auth/authButtons/LogoutButton";

const DashboardDesktopNav = () => {
  return (
    <nav className="flex h-full w-[240px] flex-col justify-between overscroll-y-none bg-primary">
      <Link href="/" className="m-5 pb-4 text-white">
        <LogoText color="white" />
      </Link>
      <DashboardNavUl />
      <LogoutButton isDashboard={true} />
    </nav>
  );
};

export default DashboardDesktopNav;
