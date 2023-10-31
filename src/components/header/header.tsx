"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import Navbar from "./navbarMobile";
import { motion } from "framer-motion";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";
import ToggleNavbarButton from "./toggleNavbarButton";

const Header = () => {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(true);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

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

  useEffect(() => {
    setIsMenuToggled(false);
  }, [isAboveMediumScreens]);

  return (
    <>
      <header
        className={`fixed z-50 h-28 w-full  ${
          isMenuToggled
            ? "h-full"
            : isTopOfPage
            ? "opacity-100"
            : "bg-opacity-70 shadow-sm"
        }`}
      >
        <div className="mx-auto flex h-28 w-5/6 items-center">
          <Logo />
          {isAboveMediumScreens ? (
            <NavbarDesktop />
          ) : (
            <ToggleNavbarButton
              setIsMenuToggled={setIsMenuToggled}
              isMenuToggled={isMenuToggled}
            />
          )}
        </div>
        {isMenuToggled && <NavbarMobile />}
      </header>
    </>
  );
};

export default Header;
