"use client";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TServiceType } from "@/lib/shared/types";
import { Label } from "@/components/ui/label";

// Type definitions
export type OptionType = {
  label: string;
  value: string;
  color: string;
};

export type GroupedOptionType = {
  label: string;
  options: OptionType[];
};

// ... (rest of your imports)

type Props = {
  serviceTypes: TServiceType[];
};

const CreateNewAvailableReservationForm = ({ serviceTypes }: Props) => {
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
      backgroundColor: data.color && `${data.color}20`, // Lighten the color for background
      color: "black", // Text color
      ":hover": {
        ...provided[":hover"],
        backgroundColor: data.color && `${data.color}40`, // Slightly darken on hover
      },
    }),
  };

  const handleSubmit = () => {
    // Handle submit logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="serviceTypes">Service Types</Label>
        <Select
          id="serviceTypes"
          instanceId="serviceTypes"
          name="serviceTypes"
          isMulti
          closeMenuOnSelect={false}
          options={options}
          styles={customStyles}
          components={makeAnimated()} // Using the makeAnimated function directly
        />
      </div>
      {/* ... other form inputs ... */}
    </form>
  );
};

export default CreateNewAvailableReservationForm;
