import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PiSignOut } from "react-icons/pi";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button
      className="hover:complementary hover:bg-complementary group flex items-center gap-1 rounded-md bg-primary
      px-[6px] py-[6px] font-medium text-slate-50 shadow-xl transition-all ease-in-out hover:bg-secondary"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <PiSignOut className="inline-block w-5 group-hover:scale-[1.15]" />
      Odhlásiť sa
    </button>
  );
};

export default LogoutButton;
