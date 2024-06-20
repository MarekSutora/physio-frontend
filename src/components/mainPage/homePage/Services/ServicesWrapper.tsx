import { TG_ServiceType } from "@/lib/shared/types";
import React from "react";
import Services from "./Services";
import { serviceTypesToDisplay } from "@/lib/shared/constants";

const ServicesWrapper = async () => {
  let serviceTypes: any;

  try {
    serviceTypes = serviceTypesToDisplay;
    
  } catch (error) {
    serviceTypes = [];
  }

  return <Services serviceTypes={serviceTypes} />;
};

export default ServicesWrapper;
