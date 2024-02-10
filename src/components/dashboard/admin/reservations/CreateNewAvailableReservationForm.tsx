"use client";

import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { TC_AvailableReservation, TG_ServiceType } from "@/lib/shared/types";
import { Label } from "@/components/ui/label";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./DatePickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAvailableReservationAction } from "@/lib/actions/reservationActions";
import { toast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";

export type OptionType = {
  label: string;
  value: string;
  color: string;
};

export type GroupedOptionType = {
  label: string;
  options: OptionType[];
};

type Props = {
  serviceTypes: TG_ServiceType[];
};

const CreateNewAvailableReservationForm = ({ serviceTypes }: Props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [capacity, setCapacity] = useState<number>(1);

  // Convert service types and their duration costs to select options
  const options = serviceTypes.flatMap((serviceType) =>
    serviceType.stdcs.map((cost) => ({
      label: `${serviceType.name} - ${cost.durationMinutes}min - ${cost.cost}e`,
      value: `${serviceType.id}-${cost.id}`, // Unique value using both IDs
      color: serviceType.hexColor, // Use the hex color for option styling
    })),
  );

  const customStyles = {
    option: (provided: any, { data }: any) => ({
      ...provided,
      backgroundColor: data.color && `${data.color}30`,
      color: "black",
      ":hover": {
        ...provided[":hover"],
        backgroundColor: data.color && `${data.color}40`,
      },
    }),
    multiValue: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: data.color && `${data.color}40`,
    }),
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: "black",
    }),
    // ... other styles
  };

  const handleSelectChange = (selected: MultiValue<OptionType>) => {
    setSelectedOptions(selected.map((option) => ({ ...option })));
    if (selected.length > 1) {
      setCapacity(1); // Automatically set capacity to 1 if more than one item is selected
    }
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stdcIds = selectedOptions.map((option) => {
      const parts = option.value.split("-");
      return parseInt(parts[1]); // Extracting the stdcId part
    });

    const reservationData: TC_AvailableReservation = {
      startTime,
      capacity,
      stdcIds,
    };

    try {
      const success = await createAvailableReservationAction(reservationData);
      if (success) {
        toast({
          variant: "success",
          title: "Available reservation created successfully!",
        });
        // Optionally reset form or perform other success actions
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: getErrorMessage(error),
      });
      // Optionally handle error actions
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="serviceTypes">Typ sluzby</Label>
        <Select
          id="serviceTypes"
          instanceId="serviceTypes"
          name="serviceTypes"
          isMulti
          closeMenuOnSelect={false}
          options={options}
          styles={customStyles}
          components={makeAnimated()}
          onChange={handleSelectChange}
          value={selectedOptions}
          required
        />
      </div>
      <div className="mt-4 flex w-[220px] flex-col gap-1 space-y-1">
        <Label htmlFor="startTime">Dátum a čas</Label>
        <DatePickerComponent startTime={startTime} setStartTime={setStartTime} />
      </div>
      <div className="mt-4">
        <Label htmlFor="capacity">Kapacita</Label>
        <Input
          type="number"
          required
          min={1}
          id="capacity"
          name="capacity"
          value={capacity}
          onChange={handleCapacityChange}
          disabled={selectedOptions.length > 1}
          className="input disabled:opacity-50"
        />
      </div>
      <div className="mt-4">
        <Button type="submit" className="btn">
          Odoslať
        </Button>
      </div>
    </form>
  );
};

export default CreateNewAvailableReservationForm;
