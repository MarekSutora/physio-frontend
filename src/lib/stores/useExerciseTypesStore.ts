import { create } from "zustand";
import { TExerciseType } from "../shared/types";

type ExerciseTypeState = {
  exerciseTypes: TExerciseType[];
  setExerciseTypes: (exerciseTypes: TExerciseType[]) => void;
};

export const useExerciseTypesStore = create<ExerciseTypeState>((set) => ({
  exerciseTypes: [],
  setExerciseTypes: (exerciseTypes) => {
    console.log("Updating exercise types in store:", exerciseTypes);
    set({ exerciseTypes });
  },
}));
