"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import AuthButtons from "@/components/auth/authButtons/AuthButtons";
import { motion, useCycle } from "framer-motion";
import { usePathname } from "next/navigation";
import useDimensions from "@/lib/hooks/useDimensions";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils";
import ToggleNavbarButton from "./ToggleNavbarButton";

const HeaderMobile = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [toggledItemsWithSubMenu, setToggledItemsWithSubMenu] = useState<
    string[]
  >([]);
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const handleItemWithSubMenuClick = (item: string) => {
    if (toggledItemsWithSubMenu.includes(item)) {
      setToggledItemsWithSubMenu(
        toggledItemsWithSubMenu.filter((i) => i !== item),
      );
    } else {
      setToggledItemsWithSubMenu([...toggledItemsWithSubMenu, item]);
    }
  };

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(0px at 100% 0)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.02, delayChildren: 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.01, staggerDirection: -1 },
    },
  };

  return (
    <header className="flex flex-col">
      <div
        className={cn(
          `z-30 h-14 w-full border-b border-gray-200 transition-all md:hidden`,
          {
            "border-b border-gray-200 bg-white/75 backdrop-blur-lg":
              scrolled && !isOpen,
            "border-b border-gray-200 bg-white fixed": selectedLayout || isOpen,
          },
        )}
      >
        <ToggleNavbarButton toggle={toggleOpen} />
      </div>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        className={`fixed top-14 z-50 h-full w-full md:hidden ${
          isOpen ? "" : "pointer-events-none"
        }`}
        ref={containerRef}
      >
        <motion.div
          className="absolute inset-0 right-0 w-full bg-white"
          variants={sidebar}
        />
        <motion.ul variants={sidebar} className=" w-full bg-white">
          <ul className="flex w-full flex-col font-semibold">
            {basicLinks.map((link) => (
              <li key={link.text} className="w-full cursor-pointer text-xl">
                {link.subMenuItems ? (
                  <div>
                    <button
                      className="flex w-full items-center gap-1 px-9 py-3 transition-all ease-in-out hover:bg-slate-200 active:bg-slate-200"
                      onClick={() => handleItemWithSubMenuClick(link.text)}
                    >
                      {link.text}
                      <motion.div
                        animate={{
                          rotate: toggledItemsWithSubMenu.includes(link.text)
                            ? 180
                            : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <FaAngleDown />
                      </motion.div>
                    </button>
                    {toggledItemsWithSubMenu.includes(link.text) && (
                      <motion.ul
                        style={{ overflow: "hidden" }}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        transition={{ duration: 0.5 }}
                        exit={{ height: 0 }}
                      >
                        {link.subMenuItems.map((subLink) => (
                          <li
                            key={subLink.text}
                            className="w-auto whitespace-nowrap"
                          >
                            <Link href={subLink.path}>
                              <div className="h-full w-full py-1 pl-14 transition-all ease-in-out hover:bg-slate-200 focus:bg-slate-200">
                                {subLink.text}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                ) : (
                  <Link href={link.path}>
                    <div className="h-full w-full px-9 py-3 transition-all ease-in-out hover:bg-slate-200 focus:border focus:bg-slate-200">
                      {link.text}
                    </div>
                  </Link>
                )}
                <div className="h-[1px] w-full bg-slate-200"></div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-center gap-3">
            <AuthButtons />
          </div>
          <ul className="mt-5 flex h-full justify-center gap-8">
            {socialMediaLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path}>
                  <div className="h-auto w-5 text-4xl text-primary transition-all duration-300 ease-in-out hover:scale-125">
                    {link.icon}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </motion.ul>
      </motion.nav>
    </header>
  );
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[14px] z-30"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

export default HeaderMobile;
