"use client";

import React, { useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import {
  ServiceTypeOptionType,
  TC_Appointment,
  TG_PatientForBookedAppointment,
  TG_ServiceType,
} from "@/lib/shared/types";
import { Label } from "@/components/ui/label";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./DatePickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAppointmentAction } from "@/lib/actions/appointmentsActions";
import { toast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";

//TODO po diplomovke - multi select pacientov aby sa dalo rezervovat viac ludi naraz (skupinovy trening)

// type PatientOptionType = {
//   label: string;
//   value: number;
// };

type Props = {
  serviceTypes: TG_ServiceType[];
  patients: TG_PatientForBookedAppointment[];
};

const CreateNewAppointmentForm = ({
  serviceTypes,
  patients,
}: Props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState<
    ServiceTypeOptionType[]
  >([]);
  // const [selectedPatient, setSelectedPatient] =
  //   useState<SingleValue<PatientOptionType>>(null);
  const [capacity, setCapacity] = useState<number>(1);

  // Convert service types and their duration costs to select options
  const serviceTypesOptions = serviceTypes.flatMap((serviceType) =>
    serviceType.stdcs.map((cost) => ({
      label: `${serviceType.name} - ${cost.durationMinutes}min - ${cost.cost}e`,
      value: `${serviceType.id}-${cost.id}`, // Unique value using both IDs
      color: serviceType.hexColor, // Use the hex color for option styling
    })),
  );

  // const patientOptions = patients.map((patient) => ({
  //   label: `${patient.firstName} ${patient.secondName} - (${patient.personId})`,
  //   value: patient.personId,
  // }));

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
  };

  // const handlePatientSelectChange = (
  //   selected: SingleValue<PatientOptionType>,
  // ) => {
  //   setSelectedPatient(selected);
  // };

  const handleServiceTypesSelectChange = (
    selected: MultiValue<ServiceTypeOptionType>,
  ) => {
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

    const stdcIds = selectedOptions.map((option) =>
      parseInt(option.value.split("-")[1]),
    );

    const appointmentData: TC_Appointment = {
      startTime,
      capacity,
      stdcIds,
    };
    try {
      const success = await createAppointmentAction(appointmentData);
      if (success) {
        toast({
          variant: "success",
          title: "Available appointment created successfully!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: getErrorMessage(error),
      });
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
          options={serviceTypesOptions}
          styles={customStyles}
          components={makeAnimated()}
          onChange={handleServiceTypesSelectChange}
          value={selectedOptions}
          required
        />
      </div>
      <div className="mt-4 flex w-[220px] flex-col gap-1 space-y-1">
        <Label htmlFor="startTime">Dátum a čas</Label>
        <DatePickerComponent
          startTime={startTime}
          setStartTime={setStartTime}
        />
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
      {/* <div className="">
        <Label htmlFor="patients">Pacient</Label>
        <Select
          id="patients"
          isMulti={false}
          instanceId="patients"
          name="patients"
          options={patientOptions}
          styles={customStyles}
          components={makeAnimated()}
          onChange={handlePatientSelectChange}
          value={selectedPatient}
          isDisabled={selectedOptions.length > 1}
          className="input disabled:opacity-50"
          isClearable={true}
        />
      </div> */}
      <div className="mt-4">
        <Button type="submit" className="btn">
          Odoslať
        </Button>
      </div>
    </form>
  );
};

export default CreateNewAppointmentForm;
