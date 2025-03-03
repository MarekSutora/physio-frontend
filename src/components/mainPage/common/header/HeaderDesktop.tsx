"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils/utils";
import NavbarDesktop from "./NavbarDesktop";
import Link from "next/link";
import { TMainPageLink } from "@/lib/shared/types";
import LogoText from "../logo/LogoText";

type HeaderDesktopProps = {
  links: TMainPageLink[];
};

const HeaderDesktop = ({ links }: HeaderDesktopProps) => {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);

      console.log("scrollY", window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        `sticky top-0 z-30 h-14 w-full bg-slate-50 transition-all`,
        !isTopOfPage && "h-16 bg-white shadow-sm",
      )}
    >
      <div className="m-auto flex h-full w-5/6 flex-row items-center justify-between">
        <div className="w-52">
          <Link href="/">
            <span aria-label="Go to homepage">
              <LogoText color="#298294" />
            </span>
          </Link>
        </div>
        <NavbarDesktop links={links} />
      </div>
    </header>
  );
};

export default HeaderDesktop;
