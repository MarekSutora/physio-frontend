"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NavbarDesktop from "./NavbarDesktop";
import useScroll from "@/lib/hooks/useScroll";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const scrolled = useScroll(5);
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
    <header
      className={cn(
        `sticky top-0 z-30 hidden h-14 w-full bg-slate-50 transition-all duration-200 ease-in md:block`,
        !isTopOfPage && "h-16 bg-white shadow-sm",
      )}
    >
      <div className="m-auto flex h-full w-5/6 flex-row items-center justify-between">
        <div className="w-52">
          <Link href="/">
            <Image
              src="/logo_textright_910_225.svg"
              alt="MoveLife Logo"
              priority
              width={200}
              height={50}
            />
          </Link>
        </div>
        <NavbarDesktop />
      </div>
    </header>
  );
};

export default Header;
