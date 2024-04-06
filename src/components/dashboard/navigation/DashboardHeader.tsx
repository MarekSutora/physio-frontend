import LogoImage from "@/components/mainPage/common/logo/LogoImage";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";

type Props = {};

const DashboardHeader = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <header className="flex h-auto w-full items-center justify-between rounded-lg border-2 border-slate-200 bg-white px-2">
      <Link href="/">
        <LogoImage style="w-10 h-10" fill="#1f6678" />
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-lg  text-slate-600">{user?.fullName}</span>
      </div>
    </header>
  );
};

export default DashboardHeader;
