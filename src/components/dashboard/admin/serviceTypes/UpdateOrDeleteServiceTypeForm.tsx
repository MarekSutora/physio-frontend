"use client";

import React from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  updateServiceTypeAction,
  deleteServiceTypeAction,
} from "@/lib/actions/serviceTypesActions";
import ServiceTypeForm from "./ServiceTypeForm";
import { TCU_ServiceType, TG_ServiceType } from "@/lib/shared/types";
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
import { ChevronsUpDown } from "lucide-react";
import { getErrorMessage } from "@/lib/utils/utils";

type Props = {
  serviceTypes: TG_ServiceType[];
};

const UpdateOrDeleteServiceTypeForm = ({ serviceTypes }: Props) => {
  const [value, setValue] = React.useState(
    serviceTypes.length > 0 ? serviceTypes[0].slug : "",
  );
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const selectedServiceType = serviceTypes.find(
    (serviceType) => serviceType.slug === value,
  );

  const updateServiceTypeData = selectedServiceType
    ? transformServiceTypeForUpdate(selectedServiceType)
    : null;

  const handleSubmit = async (values: TCU_ServiceType) => {
    try {
      if (selectedServiceType) {
        await updateServiceTypeAction(values);

        toast({
          variant: "success",
          title: "Úspešne upravená sluzba. 🎉",
          className: "text-lg",
        });
        setValue(values.name);
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
    try {
      if (selectedServiceType) {
        await deleteServiceTypeAction(selectedServiceType.id!);
      }
      toast({
        variant: "success",
        title: "Úspešne odstránená služba. 🎉",
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
              : "Vyber typ služby..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Vyber typ služby..." />
            <CommandGroup>
              {serviceTypes.map((serviceType) => (
                <CommandItem
                  key={serviceType.id}
                  value={serviceType.slug}
                  onSelect={(currentValue: string) => {
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

      {selectedServiceType && (
        <ServiceTypeForm
          serviceType={updateServiceTypeData}
          onSubmit={handleSubmit}
          key={selectedServiceType?.id || "new"}
        >
          <Button type="submit">Upraviť</Button>
          <Button
            type="button"
            className="bg-destructive hover:bg-red-400"
            onClick={handleDelete}
          >
            Odstrániť službu
          </Button>
        </ServiceTypeForm>
      )}
    </>
  );
};

const transformServiceTypeForUpdate = (
  serviceType: TG_ServiceType,
): TCU_ServiceType => {
  return {
    id: serviceType.id,
    name: serviceType.name,
    description: serviceType.description,
    hexColor: serviceType.hexColor,
    iconName: serviceType.iconName,
    imageUrl: serviceType.imageUrl,
    durationCosts: serviceType.stdcs.map((stdc) => ({
      durationMinutes: stdc.durationMinutes,
      cost: stdc.cost,
    })),
  };
};
export default UpdateOrDeleteServiceTypeForm;
