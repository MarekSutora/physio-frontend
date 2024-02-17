import { userLinks } from "@/lib/shared/constants";
import Link from "next/link";
import React from "react";
import { FaUserTie } from "react-icons/fa";
import { signIn } from "next-auth/react";

type LoginButtonProps = (typeof userLinks)[0];

const LoginButton = ({ text, path }: LoginButtonProps) => {
  return (
    <Link
      href={path}
      className="text-sec group flex items-center gap-1 rounded-sm border border-secondary px-[4px] py-[3px]
               font-bold text-secondary shadow-lg transition-all ease-in-out hover:bg-secondary hover:text-slate-50"
    >
      <FaUserTie className="inline-block w-5 group-hover:scale-[1.10]" />
      {text}
    </Link>
  );
};

export default LoginButton;
