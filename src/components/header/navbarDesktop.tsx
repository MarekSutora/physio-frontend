import React, { useState } from "react";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import LoginButton from "./loginButton";
import RegisterButton from "./registerButton";

const NavbarDesktop = () => {
  const [hoveredLink, setHoveredLink] = useState<string>("");

  return (
    <nav className="flex h-full w-full items-center justify-end">
      <ul
        className="mr-6 flex items-center justify-evenly gap-6 text-base"
        onMouseLeave={() => setHoveredLink("")}
      >
        {basicLinks.map((link) => (
          <li
            key={link.text}
            className="group relative flex cursor-pointer flex-col items-center justify-center"
            onMouseEnter={() => setHoveredLink(link.text)}
          >
            {link.subMenuItems ? (
              <div className="hover:text-shadow flex items-center gap-1">
                {link.text}{" "}
                <FaAngleDown className="transition-all duration-[400ms] ease-in-out group-hover:rotate-180" />
              </div>
            ) : (
              <div className="relative flex flex-col">
                <Link href={link.path} className="hover:text-shadow">
                  {link.text}
                </Link>
                {link.text === hoveredLink && (
                  <motion.div
                    className="absolute top-full h-[2px] w-full rounded-md bg-primary"
                    layoutId="activeHover"
                    transition={{
                      type: "weenie",
                    }}
                  />
                )}
              </div>
            )}
            {link.text === hoveredLink && hasSubMenuItems(hoveredLink) && (
              <>
                <motion.div
                  className="group absolute top-full z-10 w-auto rounded-md border bg-white shadow-md transition-all ease-in-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ul className="flex flex-col justify-evenly">
                    {link.subMenuItems?.map((subLink, index) => (
                      <li
                        key={subLink.text}
                        className="w-auto whitespace-nowrap transition-all duration-700 ease-in-out hover:bg-gray-200"
                      >
                        <Link href={subLink.path}>
                          <span className="p-2">{subLink.text}</span>
                          {index !== link.subMenuItems.length - 1 && (
                            <div className="m-auto mt-1 h-[1px] w-[95%] bg-slate-200 opacity-95"></div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  layoutId="activeHover"
                  transition={{
                    type: "weenie",
                  }}
                />
              </>
            )}
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-2">
        <LoginButton text={userLinks[0].text} path={userLinks[0].path} />
        <RegisterButton text={userLinks[1].text} path={userLinks[1].path} />
      </ul>
    </nav>
  );
};

const hasSubMenuItems = (link: string) => {
  if (basicLinks.find((item) => item.text === link)?.subMenuItems) {
    return true;
  }
};

export default NavbarDesktop;
