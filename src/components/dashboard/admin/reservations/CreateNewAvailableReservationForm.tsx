"use client";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TServiceType } from "@/lib/shared/types";
import { Label } from "@/components/ui/label";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./DatePickerComponent";

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

  console.log(serviceTypes);

  // Convert service types and their duration costs to select options
  const options = serviceTypes.flatMap((serviceType) =>
    serviceType.serviceTypeDurationCosts.map((cost) => ({
      label: `${serviceType.name} - ${cost.durationMinutes}min - ${cost.cost}e`,
      value: `${serviceType.id}-${cost.id}`, // Unique value using both IDs
      color: serviceType.hexColor, // Use the hex color for option styling
    })),
  );

  console.log(options);

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

  const handleSubmit = () => {
    // Handle submit logic here
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
        />
      </div>
      <div className="mt-4 flex w-[220px] flex-col gap-1 space-y-1">
        <Label htmlFor="date">Dátum a čas</Label>
        <DatePickerComponent date={date} setDate={setDate} />
      </div>
    
    </form>
  );
};

export default CreateNewAvailableReservationForm;
