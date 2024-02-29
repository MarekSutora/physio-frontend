import { TAppointmentExerciseDetail, TExerciseType } from "@/lib/shared/types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

type Props = {
  exerciseDetails: TAppointmentExerciseDetail;
  plannedExercises: TAppointmentExerciseDetail[];
  setPlannedExercises: (exercises: TAppointmentExerciseDetail[]) => void;
  availableExercises: TExerciseType[];
};

const labelMapping: { [key: string]: string } = {
  numberOfRepetitions: "Počet opakovaní",
  expectedNumberOfSets: "Predpokladaný počet sérií",
  expectedDurationInMinutes: "Predpokladaná doba trvania (min)",
  restAfterExerciseInMinutes: "Oddych po cvičení (min)",
  restBetweenSetsInMinutes: "Oddych medzi sériami (min)",
  weight: "Hmotnosť (kg)",
};

const ExerciseDetailsRow = ({
  exerciseDetails,
  setPlannedExercises,
  plannedExercises,
  availableExercises,
}: Props) => {
  const [value, setValue] = React.useState(exerciseDetails.exerciseType.id);
  const [open, setOpen] = React.useState(false);
  const [isMoved, setIsMoved] = useState(false);

  console.log("plannedExercises", plannedExercises);

  useEffect(() => {
    if (isMoved) {
      const timer = setTimeout(() => setIsMoved(false), 300); // Reset background after 500ms
      return () => clearTimeout(timer);
    }
  }, [isMoved]);

  const currentIndex = plannedExercises.findIndex(
    (exercise) => exercise.order === exerciseDetails.order,
  );

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

  const handleDeleteClick = (key: keyof TAppointmentExerciseDetail) => {
    const newPlannedExercises = plannedExercises.map((exercise) => {
      if (exercise.order === exerciseDetails.order) {
        return { ...exercise, [key]: null };
      }
      return exercise;
    });

    setPlannedExercises(newPlannedExercises);
  };

  const moveExercise = (direction: "up" | "down") => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < plannedExercises.length) {
      const newPlannedExercises = [...plannedExercises];
      [newPlannedExercises[currentIndex], newPlannedExercises[newIndex]] = [
        newPlannedExercises[newIndex],
        newPlannedExercises[currentIndex],
      ];
      setPlannedExercises(newPlannedExercises);
      setIsMoved(true); // Trigger background animation
    }
  };

  const handleDeletePlannedExercise = () => {
    //reorder them as well after deletion
    const newPlannedExercises = plannedExercises
      .filter((exercise) => exercise.order !== exerciseDetails.order)
      .map((exercise, index) => ({ ...exercise, order: index + 1 }));

    setPlannedExercises(newPlannedExercises);
  };

  const handleSPCheckboxChange = () => {
    const newPlannedExercises = plannedExercises.map((exercise) => {
      if (exercise.order === exerciseDetails.order) {
        return {
          ...exercise,
          successfullyPerformed: !exercise.successfullyPerformed,
        };
      }
      return exercise;
    });

    setPlannedExercises(newPlannedExercises);
  };

  return (
    <motion.div
      className="flex flex-row items-end gap-3"
      animate={{ backgroundColor: isMoved ? "#14746F" : "#ffffff" }} // Change these colors as needed
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-1">
        {currentIndex > 0 && (
          <button onClick={() => moveExercise("up")}>
            <ChevronUp />
          </button>
        )}
        {currentIndex < plannedExercises.length - 1 && (
          <button onClick={() => moveExercise("down")}>
            <ChevronDown />
          </button>
        )}
      </div>
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
            <CommandGroup className="max-h-96 overflow-y-auto">
              {availableExercises.map((exerciseType) => (
                <CommandItem
                  key={exerciseType.id}
                  value={exerciseType.name}
                  onSelect={(currentValue: string) => {
                    setValue(
                      availableExercises.find(
                        (e) =>
                          e.name.toLowerCase() === currentValue.toLowerCase(),
                      )?.id!,
                    );
                    setOpen(false);
                  }}
                >
                  {exerciseType.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {Object.keys(exerciseDetails)
        .filter(
          (key) =>
            key !== "order" &&
            key !== "successfullyPerformed" &&
            typeof exerciseDetails[key as keyof TAppointmentExerciseDetail] ===
              "number",
        )
        .map((key) => (
          <div key={key} className="flex w-full items-center gap-1">
            <div className="flex w-full flex-col">
              <Label className="text-sm" htmlFor={key}>
                {labelMapping[key] || key}
              </Label>
              <Input
                id={key + exerciseDetails.order}
                type="number"
                min={0}
                value={
                  exerciseDetails[
                    key as keyof TAppointmentExerciseDetail
                  ] as number
                }
                onChange={(e) =>
                  handleInputChange(
                    exerciseDetails.order,
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
        checked={exerciseDetails.successfullyPerformed}
        onCheckedChange={handleSPCheckboxChange}
      />
      <button onClick={handleDeletePlannedExercise}>zrusit</button>
    </motion.div>
  );
};

export default ExerciseDetailsRow;
