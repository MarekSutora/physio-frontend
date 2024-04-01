import { userLinks } from "@/lib/shared/constants";
import Link from "next/link";
import React from "react";
import { FaUserTie } from "react-icons/fa";

type LoginButtonProps = (typeof userLinks)[0];

const LoginButton = ({ text, path }: LoginButtonProps) => {
  return (
    <Link
      href={path}
      className="group flex h-8 items-center gap-1 rounded-sm border border-primary px-[4px] py-[4px]
      font-semibold text-primary shadow-lg transition-all ease-in-out hover:bg-primary hover:text-white"
    >
      <FaUserTie className="inline-block w-5 group-hover:scale-[1.10]" />
      {text}
    </Link>
  );
};

export default LoginButton;
