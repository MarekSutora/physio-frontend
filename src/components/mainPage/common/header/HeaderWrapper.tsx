import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType, TMainPageLink } from "@/lib/shared/types";
import React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

const HeaderWrapper = async () => {
  let serviceTypes: TG_ServiceType[] = [];

  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.log(error);
  }

  let basicLinks: TMainPageLink[] = [
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
      <HeaderMobile links={basicLinks} />
      <HeaderDesktop links={basicLinks} />
    </>
  );
};

export default HeaderWrapper;
