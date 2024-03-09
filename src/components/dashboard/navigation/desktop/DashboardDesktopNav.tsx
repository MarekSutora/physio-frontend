import React from "react";
import DashboardNavUl from "../DashboardNavUl";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import LogoText from "@/components/mainPage/common/logo/LogoText";
import LogoutButton from "@/components/auth/authButtons/LogoutButton";

type Props = {};

const DashboardDesktopNav = async (props: Props) => {
  return (
    <nav className="flex h-full w-[240px] flex-col justify-between overscroll-y-none bg-secondary">
      <Link href="/" className="m-5 text-white">
        <LogoText color="white" />
      </Link>
      <DashboardNavUl />
      <LogoutButton isDashboard={true} />
    </nav>
  );
};

export default DashboardDesktopNav;
