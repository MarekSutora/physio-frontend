"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import { Button } from "@/components/ui/button";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <Button
      className="hover:complementary hover:bg-complementary group flex items-center gap-1 rounded-md bg-primary
      px-[6px] py-[6px] font-bold text-slate-50 shadow-xl transition-all ease-in-out hover:bg-secondary"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <PiSignOut className="inline-block scale-125 transition-all ease-in-out group-hover:scale-[1.35]" />
      Odhlásiť sa
    </Button>
  );
};

export default LogoutButton;
