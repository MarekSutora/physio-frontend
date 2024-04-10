import { create } from "zustand";
import { TExerciseType } from "../shared/types";

type ExerciseTypeState = {
  exerciseTypes: TExerciseType[];
  setExerciseTypes: (exerciseTypes: TExerciseType[]) => void;
};

export const useExerciseTypesStore = create<ExerciseTypeState>((set) => ({
  exerciseTypes: [],
  setExerciseTypes: (exerciseTypes) => {
    set({ exerciseTypes });
  },
}));
