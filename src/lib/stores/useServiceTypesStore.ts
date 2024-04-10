import { create } from "zustand";
import { TG_ServiceType } from "../shared/types";

type ServiceTypesStore = {
  serviceTypes: TG_ServiceType[];
  setServiceTypes: (serviceTypes: TG_ServiceType[]) => void;
};

export const useServiceTypesStore = create<ServiceTypesStore>((set) => ({
  serviceTypes: [],
  setServiceTypes: (serviceTypes) => {
    set({ serviceTypes });
  },
}));
