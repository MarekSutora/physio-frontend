"use client";

import React from "react";
import { cn } from "@/lib/utils";
import NavbarDesktop from "./NavbarDesktop";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/hooks/useScroll";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <header
      className={cn(
        `sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 transition-all hidden md:block`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        },
      )}
    >
      <div className="mx-auto flex h-full w-5/6 items-center justify-between">
        {/* <Link href="/" className="flex h-full w-52">
          <Image
            src="/logo_textright_910_225.svg"
            alt="MoveLife Logo"
            fill={true}
            priority
          />
        </Link> */}
        <NavbarDesktop />
        {/* <div className="block md:hidden">
          <ToggleNavbarButton
            setIsMenuToggled={setIsMenuToggled}
            isMenuToggled={isMenuToggled}
          />
        </div> */}
      </div>
      {/* {isMenuToggled && <NavbarMobile />} */}
    </header>
  );
};

export default Header;
