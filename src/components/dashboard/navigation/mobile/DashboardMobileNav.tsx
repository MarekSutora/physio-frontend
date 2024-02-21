"use client";

import React, { useRef } from "react";
import useDimensions from "@/lib/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Hamburger from "hamburger-react";
import { motion, useCycle } from "framer-motion";
import DashboardNavUl from "../DashboardNavUl";

type Props = {};

const DashboardMobileNav = (props: Props) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);

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
      <div
        className={cn(
          "left-0 right-0 top-0 z-50 block h-14 w-full bg-primary text-white md:hidden",
          isOpen ? "fixed" : "sticky",
        )}
      >
        <button className="flex h-full w-full justify-end">
          <HamburgerWrapper toggle={toggleOpen} />
        </button>
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
          >
            <div className="flex h-full w-full flex-col overflow-y-visible border-t border-slate-200 bg-primary font-semibold">
              <DashboardNavUl />
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </>
  );
};

const HamburgerWrapper = ({ toggle }: { toggle: any }) => {
  return (
    <Hamburger
      size={20}
      color="#ffffff"
      label="Show menu"
      onToggle={toggle}
      distance="sm"
      duration={0.5}
    />
  );
};

export default DashboardMobileNav;
