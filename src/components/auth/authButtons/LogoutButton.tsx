"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <>
      <button
        className="group flex items-center gap-1 rounded-md bg-primary p-1 text-base text-slate-50 shadow-xl transition-all ease-in-out hover:bg-secondary"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <PiSignOut className="inline-block scale-125 transition-all ease-in-out group-hover:scale-[1.35]" />
        Odhlásiť sa
      </button>
    </>
  );
};

export default LogoutButton;
