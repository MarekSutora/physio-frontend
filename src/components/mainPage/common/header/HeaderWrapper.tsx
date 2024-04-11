"use client";

import React, { useEffect, useState } from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { TG_ServiceType, TMainPageLink } from "@/lib/shared/types";

const HeaderWrapper = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1280px)");
  const [serviceTypes, setServiceTypes] = useState<TG_ServiceType[]>([]);

  useEffect(() => {
    const getServiceTypes = async () => {
      const url = "/apinet/service-types";
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setServiceTypes(data);
      } catch (error) {
        setServiceTypes([]);
        console.log("Failed to get service types", error);
      }
    };

    getServiceTypes();
  }, []);

  const basicLinks: TMainPageLink[] = [
    { text: "Domov", path: "/" },
    {
      text: "Služby",
      subMenuItems: serviceTypes.map((st) => ({
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
