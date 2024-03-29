"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils/utils";
import NavbarDesktop from "./NavbarDesktop";
import Link from "next/link";
import Image from "next/image";
import { TMainPageLink } from "@/lib/shared/types";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import LogoText from "../logo/LogoText";

type HeaderDesktopProps = {
  links: TMainPageLink[];
};

const HeaderDesktop = ({ links }: HeaderDesktopProps) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1280px)");

  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

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
    <>
      {isAboveMediumScreens && (
        <header
          className={cn(
            `sticky top-0 z-30 h-14 w-full bg-slate-50 transition-all duration-200 ease-in`,
            !isTopOfPage && "h-16 bg-white shadow-sm",
          )}
        >
          <div className="m-auto flex h-full w-5/6 flex-row items-center justify-between">
            <div className="w-52">
              <Link href="/">
                <LogoText color="#298294" />
              </Link>
            </div>
            <NavbarDesktop links={links} />
          </div>
        </header>
      )}
    </>
  );
};

export default HeaderDesktop;
