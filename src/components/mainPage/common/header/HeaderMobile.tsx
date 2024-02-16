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
import Hamburger from "hamburger-react";

const HeaderMobile = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
  const [toggledItemsWithSubMenu, setToggledItemsWithSubMenu] = useState<
    string[]
  >([]);
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
        stiffness: 300,
        damping: 40,
      },
    },
  };

  return (
    <>
      <div className={cn(isOpen ? "block h-14 bg-white" : "hidden h-0")}></div>
      <header
        className={cn(
          "top-0 z-50 block h-14 w-full bg-white md:hidden",
          isOpen ? "fixed" : "sticky ",
        )}
      >
        <div className="flex h-full w-full justify-end">
          <HamburgerWrapper toggle={toggleOpen} />
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
            variants={sidebar}
            className="absolute inset-0 right-0 w-full bg-white"
          />
          <motion.ul
            variants={sidebar}
            className="flex w-full flex-col border-t border-slate-200 bg-white font-semibold"
          >
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
    </>
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

const HamburgerWrapper = ({ toggle }: { toggle: any }) => {
  return (
    <Hamburger
      size={20}
      color="#000"
      label="Show menu"
      onToggle={toggle}
      distance="sm"
      duration={0.5}
    />
  );
};

export default HeaderMobile;
