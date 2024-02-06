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
import { getErrorMessage } from "@/lib/utils";

//TODO diakritika

type Props = {
  serviceTypes: TServiceType[];
};

const UpdateOrDeleteServiceTypeForm = ({ serviceTypes }: Props) => {
  const [value, setValue] = React.useState(
    serviceTypes.length > 0 ? serviceTypes[0].name : "",
  );
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const selectedServiceType = serviceTypes.find(
    (serviceType) => serviceType.name === value,
  )!;

  const handleSubmit = async (values: TServiceType) => {
    console.log("handleSubmit", values);
    try {
      if (selectedServiceType) {
        await updateServiceTypeAction(values);

        toast({
          variant: "success",
          title: "Úspešne upravena sluzba. 🎉",
          className: "text-lg",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: getErrorMessage(error) + " 🙄",
        className: "text-lg",
      });
    }
  };

  const handleDelete = async () => {
    console.log("handleDelete");
    try {
      if (selectedServiceType) {
        await deleteServiceTypeAction(selectedServiceType.id);
      }
      toast({
        variant: "success",
        title: "Úspešne odstranena sluzba. 🎉",
        className: "text-lg",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: getErrorMessage(error) + " 🙄",
        className: "text-lg",
      });
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
              ? selectedServiceType.name
              : "Vyber typ sluzby..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Vyber typ sluzby..." />
            <CommandGroup>
              {serviceTypes.map((serviceType) => (
                <CommandItem
                  key={serviceType.id}
                  value={serviceType.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {serviceType.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedServiceType && ( // This line checks if selectedServiceType is defined
        <ServiceTypeForm
          serviceType={selectedServiceType}
          onSubmit={handleSubmit}
        >
          <Button type="submit">Update</Button>
          <Button
            type="button"
            className="bg-destructive hover:bg-red-400"
            onClick={handleDelete}
          >
            Odstranit sluzbu
          </Button>
        </ServiceTypeForm>
      )}
    </>
  );
};

export default UpdateOrDeleteServiceTypeForm;
