"use client";

import React, { useState, useEffect, use } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { HexColorPicker } from "react-colorful";
import {
  getServiceTypesAction,
  updateServiceTypeAction,
  deleteServiceTypeAction,
} from "@/lib/actions/serviceTypeActions";
import ServiceTypeForm from "./ServiceTypeForm";
import { TServiceType } from "@/lib/shared/types";
import { Select } from "@/components/ui/select";
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
import { ChevronsUpDown } from "lucide-react";
import { set } from "date-fns";
import { ca } from "date-fns/locale";

//TODO diakritika

type Props = {
  serviceTypes: TServiceType[];
};

const UpdateOrDeleteServiceTypeForm = ({ serviceTypes }: Props) => {
  const [selectedServiceType, setSelectedServiceType] =
    useState<TServiceType | null>(null);
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (values: TServiceType) => {};

  const handleDelete = async () => {
    try {
      if (selectedServiceType) {
        await deleteServiceTypeAction(selectedServiceType.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedServiceType
              ? serviceTypes.find(
                  (service) => service.name === selectedServiceType.name,
                )?.name
              : "Vyber typ sluzby..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Vyber typ sluzby..." />
            <CommandEmpty>Nenasla sa ziadna sluzba.</CommandEmpty>
            <CommandGroup>
              {serviceTypes.map((serviceType) => (
                <CommandItem
                  key={serviceType.id}
                  value={serviceType.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSelectedServiceType(serviceType);
                  }}
                >
                  {serviceType.name}\
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <ServiceTypeForm
        serviceType={selectedServiceType}
        onSubmit={handleSubmit}
      >
        <Button type="submit">Update</Button>
        <Button onClick={handleDelete}></Button>
      </ServiceTypeForm>
    </>
  );
};

export default UpdateOrDeleteServiceTypeForm;
