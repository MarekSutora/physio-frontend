"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import Navbar from "./navbar";

const Header = () => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
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
      className={`fixed z-50 h-28 w-full  ${
        isTopOfPage ? "opacity-100" : "bg-opacity-70 shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-5/6 items-center">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
