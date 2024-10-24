import { TAppointmentExerciseDetail } from "@/lib/shared/types";
import React, { useEffect } from "react";
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
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { usePlannedExercisesStore } from "@/lib/stores/usePlannedExercisesStore";
import { useExerciseTypesStore } from "@/lib/stores/useExerciseTypesStore";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils/utils";

type Props = {
  exerciseDetails: TAppointmentExerciseDetail;
  onMove: (currentIndex: number, direction: "up" | "down") => void;
  index: number;
  highlight: boolean;
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
  onMove,
  index,
  highlight,
}: Props) => {
  const { plannedExercises, setPlannedExercises } = usePlannedExercisesStore();
  const exerciseTypes = useExerciseTypesStore((state) => state.exerciseTypes);
  const { data: session } = useSession();
  const [value, setValue] = React.useState(exerciseDetails.exerciseType.id);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setValue(exerciseDetails.exerciseType.id);
  }, [exerciseDetails.exerciseType.id]);

  const isLast = index === plannedExercises.length - 1;

  const isAdmin = session?.user.roles.includes("Admin");

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
    onMove(index, direction);
  };
  const handleDeletePlannedExercise = () => {
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
      initial={{ scale: 1, backgroundColor: "#ffffff" }}
      animate={{
        scale: highlight ? 0.95 : 1,
        backgroundColor: highlight ? "#e8e8e8" : "#ffffff",
      }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <div className={cn("flex flex-col gap-1", !isAdmin && "hidden")}>
        {index > 0 && (
          <button onClick={() => moveExercise("up")}>
            <ChevronUp />
          </button>
        )}
        {!isLast && (
          <button onClick={() => moveExercise("down")}>
            <ChevronDown />
          </button>
        )}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={!isAdmin}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between disabled:opacity-100"
          >
            {value
              ? exerciseTypes.find((e) => e.id === value)?.name
              : "Vyber typ služby..."}
            <ChevronsUpDown
              className={cn(
                "ml-2 h-4 w-4 shrink-0 opacity-50",
                !isAdmin && "hidden",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Vyber typ služby..." required />
            <CommandGroup className="max-h-96 overflow-y-auto">
              {exerciseTypes.map((exerciseType) => (
                <CommandItem
                  key={exerciseType.id}
                  value={exerciseType.name}
                  onSelect={(currentValue: string) => {
                    const selectedExerciseType = exerciseTypes.find(
                      (e) =>
                        e.name.toLowerCase() === currentValue.toLowerCase(),
                    );
                    if (selectedExerciseType) {
                      setValue(selectedExerciseType.id);
                      setOpen(false);
                      const updatedPlannedExercises = plannedExercises.map(
                        (pe) => {
                          if (pe.order === exerciseDetails.order) {
                            return {
                              ...pe,
                              exerciseType: selectedExerciseType,
                            };
                          }
                          return pe;
                        },
                      );
                      setPlannedExercises(updatedPlannedExercises);
                    }
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
          <div key={key} className="flex w-32 items-end gap-1">
            <div className="flex flex-col">
              <Label className="text-xs" htmlFor={key}>
                {labelMapping[key] || key}
              </Label>
              <Input
                disabled={!isAdmin}
                className="disabled:opacity-100"
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
              className={cn(
                "mb-[5px] h-full w-6 rounded-md bg-red-500 p-0.5 text-white",
                !isAdmin && "hidden",
              )}
              onClick={() =>
                handleDeleteClick(key as keyof TAppointmentExerciseDetail)
              }
            >
              X
            </button>
          </div>
        ))}
      <div className="flex flex-row items-center gap-1 pb-2">
        <Label htmlFor={"successfullyPerformed" + exerciseDetails.order}>
          Úspešne vykonané
        </Label>
        <Checkbox
          id={"successfullyPerformed" + exerciseDetails.order}
          checked={exerciseDetails.successfullyPerformed}
          onCheckedChange={handleSPCheckboxChange}
          disabled={!isAdmin}
          className="disabled:opacity-100"
        />
      </div>
      <Button
        className={cn(!isAdmin && "hidden", "mb-1 h-7")}
        variant="destructive"
        onClick={handleDeletePlannedExercise}
      >
        Zrušiť
      </Button>
    </motion.div>
  );
};

export default ExerciseDetailsRow;
