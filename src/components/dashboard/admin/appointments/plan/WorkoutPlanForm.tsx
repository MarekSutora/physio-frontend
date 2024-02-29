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
import {
  TAppointmentDetail,
  TAppointmentExerciseDetail,
  TExerciseType,
} from "@/lib/shared/types";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Textarea } from "@/components/ui/textarea";
import { updateAppointmentDetailsAction } from "@/lib/actions/appointmentsActions";
import { toast } from "@/components/ui/use-toast";
import { get } from "http";
import { getErrorMessage } from "@/lib/utils";

type WorkoutPlanFormProps = {
  exerciseTypes: TExerciseType[];
  appointmentDetail: TAppointmentDetail;
  appointmentId: number;
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
  exerciseTypes,
  appointmentDetail,
  appointmentId,
}: WorkoutPlanFormProps) => {
  let initialPlannedExercises: TAppointmentExerciseDetail[] = [];
  if (appointmentDetail && appointmentDetail.appointmentExerciseDetails) {
    initialPlannedExercises = appointmentDetail.appointmentExerciseDetails.sort(
      (a, b) => a.order - b.order,
    );
  }

  const [plannedExercises, setPlannedExercises] = useState<
    TAppointmentExerciseDetail[]
  >(initialPlannedExercises);

  const [newExercise, setNewExercise] = useState<TAppointmentExerciseDetail>({
    exerciseType: exerciseTypes[0],
    weight: 0,
    numberOfRepetitions: 0,
    numberOfSets: 0,
    durationInMinutes: 0,
    restAfterExerciseInMinutes: 0,
    restBetweenSetsInMinutes: 0,
    order: 0,
    successfullyPerformed: false,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(
    exerciseTypes[0]?.id || null,
  );
  const [note, setNote] = useState(
    appointmentDetail ? appointmentDetail.note : "",
  );

  const addExercise = () => {
    setPlannedExercises([...plannedExercises, newExercise]);

    resetNewExercise();
  };

  const resetNewExercise = () => {
    setNewExercise({
      exerciseType: exerciseTypes[0], // Reset to the first available exercise type
      weight: 0,
      numberOfRepetitions: 0,
      numberOfSets: 0,
      durationInMinutes: 0,
      restAfterExerciseInMinutes: 0,
      restBetweenSetsInMinutes: 0,
      order: plannedExercises.length + 1, // Adjust the order to be the next in the list
      successfullyPerformed: false,
    });
    setValue(exerciseTypes[0]?.id || null); // Also reset the selected exercise type
  };

  const handleInputChange = (
    order: number,
    key: keyof TAppointmentExerciseDetail,
    newValue: number | null,
  ) => {
    const newNewExercise = { ...newExercise, [key]: newValue, order };

    setNewExercise(newNewExercise);
  };

  console.log("plannedExercises", plannedExercises);

  const handleSPCheckboxChange = (checked: CheckedState): void => {
    setNewExercise({ ...newExercise, successfullyPerformed: Boolean(checked) });
  };

  const handleDeleteClick = (key: keyof TAppointmentExerciseDetail) => {
    const newNewExercise = { ...newExercise, [key]: null };

    setNewExercise(newNewExercise);
  };

  const saveChanges = async () => {
    const _appointmentDetail = {
      note: note,
      appointmentExerciseDetails: plannedExercises, // Include the planned exercises
    };

    try {
      await updateAppointmentDetailsAction(appointmentId, _appointmentDetail);

      toast({
        variant: "success",
        title: "Available appointment created successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <PlannedExercisesList
        plannedExercises={plannedExercises}
        setPlannedExercises={setPlannedExercises}
        someRandomExerciseNames={exerciseTypes}
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
                  ? exerciseTypes.find((e) => e.id === value)?.name
                  : "Vyber typ služby..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                        const newExerciseType = exerciseTypes.find(
                          (e) =>
                            e.name.toLowerCase() === currentValue.toLowerCase(),
                        );
                        console.log("currentValue", currentValue);

                        setValue(newExerciseType?.id!);
                        setOpen(false);
                        const newNewExercise = {
                          ...newExercise,
                          newExerciseType,
                        };

                        setNewExercise(newNewExercise);
                      }}
                    >
                      {exerciseType.name}
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
                    min={0}
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
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button onClick={saveChanges}>Save</Button>
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
