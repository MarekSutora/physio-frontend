import { create } from "zustand";
import { TG_UnbookedAppointment } from "./lib/shared/types";

interface AppointmentsStore {
  appointments: TG_UnbookedAppointment[];
  setAppointments: (appointments: TG_UnbookedAppointment[]) => void;
  removeAppointmentByAstdcId: (astdcId: number) => void;
  removeAppointmentByAppId: (appId: number) => void;
}

export const useAppointmentsStore = create<AppointmentsStore>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set(() => ({ appointments })),
  removeAppointmentByAstdcId: (astdcId) =>
    set((state) => ({
      appointments: state.appointments.filter((appointment) =>
        appointment.serviceTypeInfos.every((info) => info.astdcId !== astdcId),
      ),
    })),
  removeAppointmentByAppId: (appId) =>
    set((state) => ({
      appointments: state.appointments.filter(
        (appointment) => appointment.id !== appId,
      ),
    })),
}));
