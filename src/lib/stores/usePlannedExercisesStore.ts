import { create } from "zustand";
import { TAppointmentExerciseDetail } from "../shared/types";

type PlannedExerciseState = {
  plannedExercises: TAppointmentExerciseDetail[];
  setPlannedExercises: (plannedExercises: TAppointmentExerciseDetail[]) => void;
};

export const usePlannedExercisesStore = create<PlannedExerciseState>((set) => ({
  plannedExercises: [],
  setPlannedExercises: (plannedExercises) => {
    console.log("Updating planned exercises in store:", plannedExercises);
    set({ plannedExercises });
  },
}));
