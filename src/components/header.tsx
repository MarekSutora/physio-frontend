"use client";

import React, { useEffect, useState } from "react";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimateSharedLayout } from "framer-motion";

const Header = () => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [hoveredLink, setHoveredLink] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed z-50 h-28 w-full">
      <nav className="mx-auto flex h-full w-5/6">
        <Link href="/">
          <div className="pt-3 hover:cursor-pointer">
            <Image
              src="/logo_and_text.svg"
              alt="logo"
              width={250}
              height={200}
            />
          </div>
        </Link>
        <div
          className="h-6 w-full mt-8"
          onMouseLeave={() => setHoveredLink("")}
        >
          <ul className="relative flex justify-end gap-6 text-lg">
            {basicLinks.map((link) => (
              <li
                key={link.text}
                className="group relative hover:font-bold transition-all duration-300 ease-in-out "
                onMouseEnter={() => setHoveredLink(link.text)}
              >
                {link.subMenuItems ? (
                  <>
                    <span className="cursor-pointer">{link.text}</span>
                    <ul className="absolute left-0 mt-2 hidden space-y-2 border bg-white group-hover:block">
                      {link.subMenuItems.map((subLink) => (
                        <li key={subLink.text}>
                          <Link href={subLink.path}>{subLink.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <Link href={link.path}>{link.text}</Link>
                  </>
                )}
                {link.text === hoveredLink && (
                  <motion.div
                    className="absolute left-0 right-0 top-[calc(100%+2px)] h-[1px] bg-green-600"
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
