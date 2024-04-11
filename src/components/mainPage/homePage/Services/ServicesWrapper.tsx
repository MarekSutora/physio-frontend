import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import { TG_ServiceType } from "@/lib/shared/types";
import React from "react";
import Services from "./Services";

const ServicesWrapper = async () => {
  let serviceTypes: TG_ServiceType[] = [];

  try {
    serviceTypes = await getServiceTypesAction();
    
  } catch (error) {
    serviceTypes = [];
  }

  return <Services serviceTypes={serviceTypes} />;
};

export default ServicesWrapper;
