"use client";

import React, { useEffect, useState, useRef } from "react";
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
import Image from "next/image";
import SocialMediaLinks from "../socialMediaLinks";
import LogoImage from "../logo/logoImage";
import LogoText from "../logo/logoText";
import { useInView } from "framer-motion";

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
    <header
      className={`sticky top-0 h-24 w-full bg-slate-50 ${
        !isTopOfPage && "shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-5/6 items-center">
        <Link href="/" className="flex h-full w-auto flex-col justify-center">
          <div className="mt-auto pb-1">
          <Image
              src="/logo_textright_910_225.svg"
              alt="MoveLife Logo"
              width={350}
              height={100}
              priority
            />
          </div>
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
