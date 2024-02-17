import { userLinks } from "@/lib/shared/constants";
import Link from "next/link";
import React from "react";
import { FaUserPlus } from "react-icons/fa";

type RegisterButtonProps = (typeof userLinks)[1];

const RegisterButton = ({ text, path }: RegisterButtonProps) => {
  return (
    <Link
      href={path}
      className="hover:complementary hover:bg-complementary group flex items-center gap-1 rounded-md bg-primary
                     px-[4px] py-[3px] font-bold text-slate-50 shadow-xl transition-all ease-in-out hover:bg-secondary"
    >
      <FaUserPlus className="inline-block w-5 group-hover:scale-[1.10]" />
      {text}
    </Link>
  );
};

export default RegisterButton;
