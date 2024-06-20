"use client";

import React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { TMainPageLink } from "@/lib/shared/types";
import { serviceTypesToDisplay } from "@/lib/shared/constants";

const HeaderWrapper = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1280px)");

  const basicLinks: TMainPageLink[] = [
    { text: "Domov", path: "/" },
    {
      text: "Služby",
      subMenuItems: serviceTypesToDisplay.map((st) => ({
        text: st.name,
        path: `/sluzby/${st.slug}`,
      })),
    },
    { text: "Kontakt", path: "/kontakt" },
    { text: "Blog", path: "/blog" },
    { text: "Rezervácia", path: "/rezervacia" },
  ];

  return (
    <>
      {isAboveMediumScreens ? (
        <HeaderDesktop links={basicLinks} />
      ) : (
        <HeaderMobile links={basicLinks} />
      )}
    </>
  );
};

export default HeaderWrapper;
