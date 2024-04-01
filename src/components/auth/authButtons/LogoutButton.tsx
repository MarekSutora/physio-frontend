"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import { cn } from "@/lib/utils/utils";

type Props = {
  isDashboard?: boolean;
};

const LogoutButton = ({ isDashboard }: Props) => {
  return (
    <button
      className={cn(
        !isDashboard
          ? " rounded-sm border border-primary px-[4px] py-[4px] font-semibold text-primary shadow-lg transition-all ease-in-out hover:bg-primary  hover:text-white"
          : "w-full items-center pl-1 font-normal text-white  hover:bg-slate-100 hover:text-primary/85",
        "group flex h-8 items-center text-nowrap",
      )}
      onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
    >
      <PiSignOut className="inline-block h-6 w-6 group-hover:scale-[1.10]" />
      Odhlásiť sa
    </button>
  );
};

export default LogoutButton;
