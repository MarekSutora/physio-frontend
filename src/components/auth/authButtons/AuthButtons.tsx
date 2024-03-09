"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { userLinks } from "@/lib/shared/constants";
import LogoutButton from "./LogoutButton";
import { MdDashboard } from "react-icons/md";

const AuthButtons = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex flex-row items-center gap-1">
        <DashboardButton userRoles={session.user.roles} />
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <LoginButton text={userLinks[0].text} path={userLinks[0].path} />
      <RegisterButton text={userLinks[1].text} path={userLinks[1].path} />
    </div>
  );
};

type DashboardButtonProps = {
  userRoles: string[];
};

const DashboardButton = ({ userRoles }: DashboardButtonProps) => {
  const linkPath = userRoles.includes("Admin")
    ? "/dashboard/admin/statistiky"
    : "dashboard/klient/rezervacie";

  return (
    <Link
      href={linkPath}
      className="group flex h-8 items-center gap-1 rounded-sm bg-primary px-[4px] py-[4px] font-bold border border-primary
      text-white shadow-xl transition-all ease-in-out hover:bg-white hover:text-primary"
    >
      <MdDashboard className="inline-block w-5 group-hover:scale-[1.10]" />
      Dashboard
    </Link>
  );
};

export default AuthButtons;
