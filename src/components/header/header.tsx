"use client";

import React, { useEffect, useState, useRef } from "react";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import NavbarDesktop from "@/components/header/NavbarDesktop";
import NavbarMobile from "@/components/header/NavbarMobile";
import ToggleNavbarButton from "@/components/header/ToggleNavbarButton";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import Image from "next/image";
import SocialMediaLinks from "../socialMediaLinks";
import LogoImage from "../logo/logoImage";
import LogoText from "../logo/logoText";
import { useInView } from "framer-motion";

const Header = () => {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(true);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1020px)");

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
    <header
      className={`z-1000 sticky top-0 h-24 w-full bg-white ${
        !isTopOfPage && "shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-5/6 items-center justify-between">
        <Link href="/" className="relative flex h-full w-52 md:mt-4  lg:w-96">
          <Image
            src="/logo_textright_910_225.svg"
            alt="MoveLife Logo"
            fill={true}
            priority
          />
        </Link>
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
      {isMenuToggled && <NavbarMobile />}
    </header>
  );
};

export default Header;
