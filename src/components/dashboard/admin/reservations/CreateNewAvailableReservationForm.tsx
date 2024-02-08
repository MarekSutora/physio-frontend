"use client";

import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { TServiceType } from "@/lib/shared/types";
import { Label } from "@/components/ui/label";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./DatePickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  serviceTypes: TServiceType[];
};

const CreateNewAvailableReservationForm = ({ serviceTypes }: Props) => {
  const [date, setDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [capacity, setCapacity] = useState<number>(1);

  // Convert service types and their duration costs to select options
  const options = serviceTypes.flatMap((serviceType) =>
    serviceType.serviceTypeDurationCosts.map((cost) => ({
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
    setSelectedOptions(selected.map(option => ({ ...option })));
    if (selected.length > 1) {
      setCapacity(1); // Automatically set capacity to 1 if more than one item is selected
    }
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit", {
      date,
      capacity,
      serviceTypeIds: selectedOptions.map((option) => Number(option.value.split("-")[0])),
    });
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
        <Label htmlFor="date">Dátum a čas</Label>
        <DatePickerComponent date={date} setDate={setDate} />
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
