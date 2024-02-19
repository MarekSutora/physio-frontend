import { create } from "zustand";
import { TG_UnbookedAppointment } from "./lib/shared/types";

interface AppointmentsStore {
  appointments: TG_UnbookedAppointment[];
  setAppointments: (appointments: TG_UnbookedAppointment[]) => void;
  removeAppointment: (astdcId: number) => void;
}

export const useAppointmentsStore = create<AppointmentsStore>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set(() => ({ appointments })),
  removeAppointment: (astdcId) =>
    set((state) => ({
      appointments: state.appointments.filter((appointment) =>
        appointment.serviceTypeInfos.every((info) => info.astdcId !== astdcId),
      ),
    })),
}));
