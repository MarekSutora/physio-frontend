"use client";

import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { TAppointmentExerciseDetail } from "@/lib/shared/types";

// Assuming TAppointmentExerciseDetail and other types are defined elsewhere

type WorkoutPlanFormProps = {
  initialExercises: TAppointmentExerciseDetail[];
  availableExercises: { label: string; value: string }[]; // List of available exercises for the dropdown
};

const WorkoutPlanForm = ({
  initialExercises,
  availableExercises,
}: WorkoutPlanFormProps) => {
  const [exercises, setExercises] = useState<TAppointmentExerciseDetail[]>(
    initialExercises.sort((a, b) => a.order - b.order),
  );

  // Placeholder for a new exercise
  const emptyExercise: TAppointmentExerciseDetail = {
    exerciseName: null, // Set default or null based on your needs
    expectedNumberOfSets: null,
    numberOfRepetitions: null,
    expectedDurationInMinutes: null,
    restAfterExerciseInMinutes: null,
    restBetweenSetsInMinutes: null,
    order: exercises.length + 1, // Or another logic to set the order
  };

  const [newExercise, setNewExercise] =
    useState<TAppointmentExerciseDetail>(emptyExercise);

  const handleNewExerciseChange = (
    key: keyof TAppointmentExerciseDetail,
    value: string | number,
  ) => {
    setNewExercise({ ...newExercise, [key]: value });
  };

  const addNewExercise = () => {
    // Logic to add the new exercise to the list
    // For example:
    setExercises([...exercises, newExercise]);
    setNewExercise(emptyExercise); // Reset the placeholder
  };

  return (
    <div>
      {exercises.length > 0 &&
        exercises.map((exercise, index) => (
          <div key={index} className="flex flex-row gap-2">
            <Dropdown
              value={exercise.exerciseName}
              options={availableExercises}
              placeholder="Vyberte cvičenie"
              filter
            />
            {Object.keys(exercise).map((key) => {
              if (
                key !== "exerciseName" &&
                key !== "order" &&
                exercise[key as keyof TAppointmentExerciseDetail] !== null
              ) {
                let label;
                switch (key) {
                  case "expectedNumberOfSets":
                    label = "Počet sérií";
                    break;
                  case "numberOfRepetitions":
                    label = "Počet opakovaní";
                    break;
                  case "expectedDurationInMinutes":
                    label = "Trvanie v minútach";
                    break;
                  case "restAfterExerciseInMinutes":
                    label = "Odpočinok po cvičení v minútach";
                    break;
                  case "restBetweenSetsInMinutes":
                    label = "Odpočinok medzi sériami v minútach";
                    break;
                  default:
                    label = "";
                }

                return (
                  <div key={key}>
                    <label htmlFor={`${key}-${index}`}>{label}</label>
                    <input
                      id={`${key}-${index}`}
                      type="number"
                      value={
                        exercise[
                          key as keyof TAppointmentExerciseDetail
                        ] as number
                      }
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      <div className="flex flex-row gap-2">
        <Dropdown
          value={newExercise.exerciseName}
          options={availableExercises}
          onChange={(e) => handleNewExerciseChange("exerciseName", e.value)}
          placeholder="Select an Exercise"
        />
        {Object.keys(emptyExercise)
          .filter((key) => key !== "exerciseName" && key !== "order")
          .map((key) => {
            if (
              key !== "exerciseName" &&
              key !== "order" &&
              emptyExercise[key as keyof TAppointmentExerciseDetail] !== null
            ) {
              let label;
              switch (key) {
                case "expectedNumberOfSets":
                  label = "Počet sérií";
                  break;
                case "numberOfRepetitions":
                  label = "Počet opakovaní";
                  break;
                case "expectedDurationInMinutes":
                  label = "Trvanie v minútach";
                  break;
                case "restAfterExerciseInMinutes":
                  label = "Odpočinok po cvičení v minútach";
                  break;
                case "restBetweenSetsInMinutes":
                  label = "Odpočinok medzi sériami v minútach";
                  break;
                default:
                  label = "";
              }

              return (
                <div key={key}>
                  <label>{label}</label>
                  <input type="number" />
                </div>
              );
            }
            return null;
          })}
      </div>
      <div className="p-col">
        <button onClick={addNewExercise}>Add Exercise</button>
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
