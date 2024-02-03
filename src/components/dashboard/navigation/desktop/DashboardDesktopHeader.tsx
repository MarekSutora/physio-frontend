import LogoImage from "@/components/logo/LogoImage";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";
import LogoutButton from "@/components/auth/authButtons/LogoutButton";

type Props = {};

const DashboardDesktopHeader = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <header className="hidden h-auto w-full items-center justify-between border-slate-200 bg-white px-2 md:rounded-lg md:border-2 lg:flex">
      <Link href="/">
        <LogoImage style="w-14 h-14" fill="#14746F" />
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-lg  text-slate-600">{user?.fullName}</span>
      </div>
    </header>
  );
};

export default DashboardDesktopHeader;
