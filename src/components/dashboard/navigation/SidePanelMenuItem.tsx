import Link from "next/dist/client/link";
import React from "react";

type Props = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

const SidePanelMenuItem = ({ text, icon, path }: Props) => {
  return (
    <li key={text}>
      <Link
        className="group flex flex-row items-center gap-2 ml-3 pl-2 py-2 text-lg text-white rounded-md hover:bg-teal-700 transition-all duration-300 ease-in-out w-5/6"
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
