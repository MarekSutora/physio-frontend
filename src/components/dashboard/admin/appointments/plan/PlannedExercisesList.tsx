import { TAppointmentExerciseDetail, TExerciseType } from "@/lib/shared/types";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import ExerciseDetailsRow from "./ExerciseDetailsRow";

type Props = {
  plannedExercises: TAppointmentExerciseDetail[];
  setPlannedExercises: (exercises: TAppointmentExerciseDetail[]) => void;
  someRandomExerciseNames: TExerciseType[];
};

const PlannedExercisesList = ({
  plannedExercises,
  setPlannedExercises,
  someRandomExerciseNames,
}: Props) => {
  return (
    <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto">
      {plannedExercises.map((exercise, index) => (
        <div key={exercise.order} className="flex flex-row gap-3">
          <ExerciseDetailsRow
            key={exercise.order}
            exerciseDetails={exercise}
            availableExercises={someRandomExerciseNames}
            setPlannedExercises={setPlannedExercises}
            plannedExercises={plannedExercises}
          />
        </div>
      ))}
    </div>
  );
};

export default PlannedExercisesList;
