"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import Navbar from "./navbarMobile";
import { motion } from "framer-motion";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";
import ToggleNavbarButton from "./toggleNavbarButton";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import SocialMediaLinks from "../socialMediaLinks";

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
    <header className="fixed w-full">
      <div
        className={`z-50 h-24 w-full shadow-sm  ${
          isTopOfPage ? "bg-opacity-100" : "h-24 bg-opacity-70"
        }`}
      >
        <div className="mx-auto flex h-full w-5/6 items-center">
          <Logo />
          {isAboveMediumScreens ? (
            <>
              <NavbarDesktop />
              <nav>
                <ul className="absolute right-2 top-2 flex h-full flex-col items-center gap-1">
                  {socialMediaLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.path}>
                        <div className="h-auto w-5 text-2xl text-primary transition-all duration-300 ease-in-out hover:scale-125">
                          {link.icon}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          ) : (
            <ToggleNavbarButton
              setIsMenuToggled={setIsMenuToggled}
              isMenuToggled={isMenuToggled}
            />
          )}
        </div>
      </div>
      {isMenuToggled && <NavbarMobile />}
    </header>
  );
};

export default Header;
