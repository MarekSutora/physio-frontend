"use client";

import Link from "next/dist/client/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

const SidePanelMenuItem = ({ text, icon, path }: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;

  return (
    <li key={text}>
      <Link
        className="group flex w-full flex-row items-center gap-2 rounded-md py-2 pl-5 text-lg text-white transition-all duration-300 ease-in-out hover:bg-teal-700"
        href={path}
      >
        <div className="scale-125 transition-all duration-300 ease-in-out hover:underline group-hover:scale-[1.35] group-active:scale-[1.35]">
          {icon}
        </div>
        {text}
      </Link>
    </li>
  );
};

export default SidePanelMenuItem;
