"use client";

import React, { useCallback, useRef } from "react";
import { socialMediaLinks } from "@/lib/shared/constants";
import Link from "next/link";
import AuthButtons from "@/components/auth/authButtons/AuthButtons";
import { motion, useCycle } from "framer-motion";
import useDimensions from "@/lib/hooks/useDimensions";
import { cn } from "@/lib/utils/utils";
import Hamburger from "hamburger-react";
import MobileMenuItem from "./MobileMenuItem";
import { TMainPageLink } from "@/lib/shared/types";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

type HeaderMobileProps = {
  links: TMainPageLink[];
};

const HeaderMobile = ({ links }: HeaderMobileProps) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1280px)");

  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);

  const closeMenu = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

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
      {!isAboveMediumScreens && (
        <>
          <div
            className={cn(
              isOpen ? "block h-14 bg-white" : "hidden h-0",
              " w-full",
            )}
          ></div>
          <header
            className={cn(
              "top-0 z-50 block h-14 w-screen bg-white xl:hidden",
              isOpen ? "fixed" : "stickyy",
            )}
          >
            <div className="flex justify-end pr-3">
              <HamburgerWrapper toggle={toggleOpen} toggled={isOpen} />
            </div>
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              custom={height}
              className={cn(
                "top-[55px] h-full w-screen xl:hidden",
                isOpen ? "z-50 fixed" : "-z-50 hidden",
              )}
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
                {links.map((link, index) => (
                  <MobileMenuItem
                    key={index}
                    text={link.text}
                    path={link.path}
                    subMenuItems={link.subMenuItems}
                    closeMenu={closeMenu}
                  />
                ))}
                <div className="m-auto mt-5 flex gap-3" onClick={closeMenu}>
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
      )}
    </>
  );
};

type HamburgerWrapperProps = {
  toggle: any;
  toggled: boolean;
};

const HamburgerWrapper = ({ toggle, toggled }: HamburgerWrapperProps) => {
  return (
    <Hamburger
      size={20}
      color="#000"
      label="Show menu"
      onToggle={toggle}
      toggled={toggled}
      distance="sm"
      duration={0.5}
    />
  );
};

export default HeaderMobile;
