import { userLinks } from "@/lib/shared/constants";
import Link from "next/link";
import React from "react";
import { FaUserPlus } from "react-icons/fa";

type RegisterButtonProps = (typeof userLinks)[1];

const RegisterButton = ({ text, path }: RegisterButtonProps) => {
  return (
    <Link
      href={path}
      className="group flex h-8 items-center gap-1 rounded-sm bg-primary px-[4px] py-[4px] font-bold border border-primary
                     text-white shadow-xl transition-all ease-in-out hover:bg-white hover:text-primary"
    >
      <FaUserPlus className="inline-block w-5 group-hover:scale-[1.10]" />
      {text}
    </Link>
  );
};

export default RegisterButton;
