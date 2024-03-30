import { TAppointmentExerciseDetail, TExerciseType } from "@/lib/shared/types";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import ExerciseDetailsRow from "./ExerciseDetailsRow";
import { usePlannedExercisesStore } from "@/lib/stores/usePlannedExercisesStore";

const PlannedExercisesList = () => {
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const { plannedExercises, setPlannedExercises } = usePlannedExercisesStore();

  const handleMove = (currentIndex: number, direction: "up" | "down"): void => {
    if (direction === "up" && currentIndex === 0) return;
    if (direction === "down" && currentIndex === plannedExercises.length - 1)
      return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    const newExercises = [...plannedExercises];

    [newExercises[currentIndex], newExercises[newIndex]] = [
      newExercises[newIndex],
      newExercises[currentIndex],
    ];

    newExercises[currentIndex].order =
      currentIndex + (direction === "down" ? 2 : 0);
    newExercises[newIndex].order = newIndex + (direction === "up" ? 2 : 1);

    setPlannedExercises(newExercises);

    setHighlightIndex(newIndex);

    setTimeout(() => setHighlightIndex(-1), 200);
  };

  return (
    <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto">
      {plannedExercises.map((exercise, index) => (
        <div
          key={exercise.order + " " + index}
          className="flex flex-row gap-3 border-b border-gray-200 pb-2"
        >
          <ExerciseDetailsRow
            exerciseDetails={exercise}
            onMove={handleMove}
            index={index}
            highlight={index === highlightIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default PlannedExercisesList;
