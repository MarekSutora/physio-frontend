import useMediaQuery from "@/lib/hooks/useMediaQuery";
import React, { useState } from "react";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaUserPlus, FaUserTie } from "react-icons/fa";
import { type } from "os";

const NavbarDesktop = () => {
  const [hoveredLink, setHoveredLink] = useState<string>("");

  return (
    <nav
      className="flex h-full w-full items-center justify-end "
      onMouseLeave={() => setHoveredLink("")}
    >
      <ul className="relative mr-6 flex items-center justify-evenly gap-6 text-base">
        {basicLinks.map((link) => (
          <li
            key={link.text}
            className="group relative"
            onMouseEnter={() => setHoveredLink(link.text)}
          >
            {link.subMenuItems ? (
              <>
                <span className="cursor-default">{link.text}</span>
                <ul className="absolute left-0 mt-2 hidden border bg-white group-hover:block">
                  {link.subMenuItems.map((subLink) => (
                    <li key={subLink.text}>
                      <Link href={subLink.path}>{subLink.text}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={link.path}>{link.text}</Link>
            )}
            {link.text === hoveredLink && (
              <motion.div
                className="absolute left-0 right-0 top-[calc(100%+2px)] h-[1px] bg-primary"
                layoutId="activeHover"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-2">
        <li key={userLinks[0].text}>
          <Link
            href={userLinks[0].path}
            className="text-sec group flex items-center gap-1 rounded-sm border border-secondary p-2
                           font-bold text-secondary shadow-lg transition-all ease-in-out hover:bg-secondary hover:text-slate-50"
          >
            <FaUserTie className="inline-block w-5 group-hover:scale-[1.10]" />
            {userLinks[0].text}
          </Link>
        </li>
        <li key={userLinks[1].text}>
          <Link
            href={userLinks[1].path}
            className="hover:complementary group flex items-center gap-1 rounded-md bg-primary
                           px-2 py-2 font-bold text-slate-50 shadow-xl transition-all ease-in-out hover:bg-complementary hover:text-black"
          >
            <FaUserPlus className="inline-block w-5 group-hover:scale-[1.10]" />
            {userLinks[1].text}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
