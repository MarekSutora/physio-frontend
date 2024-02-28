"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PlannedExercisesList from "./PlannedExercisesList";
import { TAppointmentExerciseDetail, TExerciseType } from "@/lib/shared/types";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ca } from "date-fns/locale";
import { updateAppointmentDetails } from "@/lib/actions/appointmentsActions";

type WorkoutPlanFormProps = {
  initialExercises: TAppointmentExerciseDetail[];
  availableExercises: TExerciseType[];
  appId: number;
};

const labelMapping: { [key: string]: string } = {
  numberOfRepetitions: "Počet opakovaní",
  expectedNumberOfSets: "Predpokladaný počet sérií",
  expectedDurationInMinutes: "Predpokladaná doba trvania (min)",
  restAfterExerciseInMinutes: "Oddych po cvičení (min)",
  restBetweenSetsInMinutes: "Oddych medzi sériami (min)",
  weight: "Hmotnosť (kg)",
};

const WorkoutPlanForm = ({
  initialExercises,
  availableExercises,
  appId,
}: WorkoutPlanFormProps) => {
  const [plannedExercises, setPlannedExercises] = useState<
    TAppointmentExerciseDetail[]
  >(initialExercises.sort((a, b) => a.order - b.order));
  const [newExercise, setNewExercise] = useState<TAppointmentExerciseDetail>({
    exerciseType: availableExercises[0],
    weight: 0,
    numberOfRepetitions: 0,
    expectedNumberOfSets: 0,
    expectedDurationInMinutes: 0,
    restAfterExerciseInMinutes: 0,
    restBetweenSetsInMinutes: 0,
    order: 0,
    successfullyPerformed: false,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);

  const addExercise = () => {
    setPlannedExercises([...plannedExercises, newExercise]);
  };

  const resetNewExercise = () => {
    setNewExercise({
      exerciseType: availableExercises[0], // Reset to the first available exercise type
      weight: 0,
      numberOfRepetitions: 0,
      expectedNumberOfSets: 0,
      expectedDurationInMinutes: 0,
      restAfterExerciseInMinutes: 0,
      restBetweenSetsInMinutes: 0,
      order: plannedExercises.length + 1, // Adjust the order to be the next in the list
      successfullyPerformed: false,
    });
    setValue(availableExercises[0]?.id || null); // Also reset the selected exercise type
  };

  const handleInputChange = (
    order: number,
    key: keyof TAppointmentExerciseDetail,
    newValue: number | null,
  ) => {
    const newPlannedExercises = plannedExercises.map((exercise) => {
      if (exercise.order === order) {
        return { ...exercise, [key]: newValue };
      }
      return exercise;
    });

    setPlannedExercises(newPlannedExercises);
  };

  const handleSPCheckboxChange = (checked: CheckedState): void => {
    setNewExercise({ ...newExercise, successfullyPerformed: Boolean(checked) });
  };

  const handleDeleteClick = (key: keyof TAppointmentExerciseDetail) => {
    const newNewExercise = { ...newExercise, [key]: null };

    setNewExercise(newNewExercise);
  };

  const saveChanges = async () => {
    try {
        await updateAppointmentDetails(appId, plannedExercises);
        //TODO toast
    } catch (error) {
      
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <PlannedExercisesList
        plannedExercises={plannedExercises}
        setPlannedExercises={setPlannedExercises}
        someRandomExerciseNames={availableExercises}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? availableExercises.find((e) => e.id === value)?.name
                  : "Vyber typ služby..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Vyber typ služby..." required />
                <CommandGroup>
                  {availableExercises.map((serviceType) => (
                    <CommandItem
                      key={serviceType.id}
                      value={serviceType.name}
                      onSelect={(currentValue: string) => {
                        setValue(
                          availableExercises.find(
                            (e) => e.name === currentValue,
                          )?.id!,
                        );
                        setOpen(false);
                      }}
                    >
                      {serviceType.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {Object.keys(newExercise)
            .filter(
              (key) =>
                key !== "order" &&
                key !== "successfullyPerformed" &&
                typeof newExercise[key as keyof TAppointmentExerciseDetail] ===
                  "number",
            )
            .map((key) => (
              <div key={key} className="flex w-full items-center gap-1">
                <div className="flex w-full flex-col">
                  <Label className="text-sm" htmlFor={key}>
                    {labelMapping[key] || key}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    value={
                      newExercise[
                        key as keyof TAppointmentExerciseDetail
                      ] as number
                    }
                    onChange={(e) =>
                      handleInputChange(
                        newExercise.order,
                        key as keyof TAppointmentExerciseDetail,
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <button
                  className="ml-2 rounded bg-red-500 p-1 text-white"
                  onClick={() =>
                    handleDeleteClick(key as keyof TAppointmentExerciseDetail)
                  }
                >
                  X
                </button>
              </div>
            ))}
          <Checkbox
            checked={newExercise.successfullyPerformed}
            onCheckedChange={handleSPCheckboxChange}
          />
          <Button onClick={addExercise}>Add</Button>
          <Button onClick={resetNewExercise}>Refresh</Button>
        </div>

        <Label htmlFor="note">Note</Label>
        <Textarea id="note" />

        <Button onClick={saveChanges}>Save</Button>
        {/* Refresh button */}
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
