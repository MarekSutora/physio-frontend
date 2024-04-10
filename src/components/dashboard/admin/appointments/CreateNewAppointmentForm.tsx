"use client";

import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import {
  ServiceTypeOptionType,
  TC_Appointment,
  TG_ServiceType,
} from "@/lib/shared/types";
import { Label } from "@/components/ui/label";
import DatePickerComponent from "./DatePickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAppointmentAction } from "@/lib/actions/appointmentsActions";
import { toast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  serviceTypes: TG_ServiceType[];
};

const CreateNewAppointmentForm = ({ serviceTypes }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState<
    ServiceTypeOptionType[]
  >([]);

  const [capacity, setCapacity] = useState<number>(1);

  const serviceTypesOptions = serviceTypes.flatMap((serviceType) =>
    serviceType.stdcs.map((cost) => ({
      label: `${serviceType.name} - ${cost.durationMinutes}min - ${cost.cost}€`,
      value: `${serviceType.id}-${cost.id}`,
      color: serviceType.hexColor,
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
  };

  const handleServiceTypesSelectChange = (
    selected: MultiValue<ServiceTypeOptionType>,
  ) => {
    setSelectedOptions(selected.map((option) => ({ ...option })));
    if (selected.length > 1) {
      setCapacity(1);
    }
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const stdcIds = selectedOptions.map((option) =>
      parseInt(option.value.split("-")[1]),
    );

    const appointmentData: TC_Appointment = {
      startTime,
      capacity,
      stdcIds,
    };
    try {
      await createAppointmentAction(appointmentData);
      toast({
        variant: "success",
        title: "Nový termín úspešne vytvorený! 🎉",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Chyba pri vytváraní termínu. Skúste to prosím znova. 🙄",
      });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? (
        <ClipLoader
          color={"#298294"}
          loading={true}
          cssOverride={{
            width: "100px",
            height: "100px",
            display: "block",
            margin: "0 auto",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="flex h-full w-full items-center justify-center"
        />
      ) : (
        <>
          <div className="space-y-1">
            <Label htmlFor="serviceTypes">Typ služby</Label>
            <Select
              id="serviceTypes"
              instanceId="serviceTypes"
              name="serviceTypes"
              isMulti
              closeMenuOnSelect={false}
              placeholder="Vyberte typ služby"
              options={serviceTypesOptions}
              styles={customStyles}
              components={makeAnimated()}
              onChange={handleServiceTypesSelectChange}
              value={selectedOptions}
              required
              noOptionsMessage={() => ""}
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
          <div className="mt-4">
            <Button type="submit" className="w-full">
              Vytvoriť
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default CreateNewAppointmentForm;
