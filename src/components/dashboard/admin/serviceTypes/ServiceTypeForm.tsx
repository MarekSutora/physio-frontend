"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TServiceType } from "@/lib/shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconName } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import FormConfirmationDialog from "@/components/mainPage/common/FormConfirmationDialog";

const durationCostSchema = z.object({
  durationMinutes: z.coerce
    .number()
    .int()
    .min(1, { message: "Trvanie musí byť aspoň 1 minúta." }),
  cost: z.coerce.number().min(1, { message: "Cena musí byť aspoň 1." }),
});

const serviceTypeFormSchema = z.object({
  id: z.any().optional(),
  name: z
    .string()
    .min(3, { message: "Názov služby musí mať minimálne 3 znaky." })
    .max(150, { message: "Názov služby nesmie presiahnuť 150 znakov." }),
  description: z
    .string()
    .min(1, { message: "Popis je povinný." })
    .max(10000, { message: "Popis nesmie presiahnuť 10000 znakov." }),
  hexColor: z
    .string()
    .min(7, { message: "Hex farba musí mať presne 7 znakov." })
    .max(7, { message: "Hex farba musí mať presne 7 znakov." }),
  durationCosts: z.array(durationCostSchema),
  imageUrl: z.string().url({ message: "Formát URL adresy je neplatný." }),
  iconName: z
    .string()
    .min(1, { message: "Názov ikony je povinný." })
    .max(50, { message: "Názov ikony nesmie presiahnuť 50 znakov." }),
});

type Props = {
  serviceType: TServiceType | null;
  children: React.ReactNode;
  onSubmit: SubmitHandler<TServiceType>;
};
library.add(Icons.fas);

const ServiceTypeForm = ({ serviceType, children, onSubmit }: Props) => {
  const [dynamicIcon, setDynamicIcon] = useState<IconName | null>(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const form = useForm<TServiceType>({
    resolver: zodResolver(serviceTypeFormSchema),
    defaultValues: {
      id: serviceType?.id ?? null,
      name: serviceType?.name ?? "",
      description: serviceType?.description ?? "",
      hexColor: serviceType?.hexColor ?? "#aabbcc",
      durationCosts: serviceType?.durationCosts ?? [
        { durationMinutes: 0, cost: 0 },
      ],
      imageUrl: serviceType?.imageUrl ?? "",
      iconName: serviceType?.iconName ?? "",
    },
  });

  useEffect(() => {
    const iconName = form.getValues("iconName");
    const iconKey = iconName.replace("Fa", "").toLowerCase() as IconName;
    const faIcon = (Icons as any)[
      `fa${iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}`
    ];

    setDynamicIcon(faIcon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("iconName")]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "durationCosts",
  });

  const renderIcon = () => {
    return dynamicIcon ? (
      <FontAwesomeIcon className="w-1/3 text-4xl" icon={dynamicIcon as any} />
    ) : (
      <div className="w-1/3"></div>
    );
  };

  const onConfirmDialog = async (data: TServiceType) => {
    await onSubmit(data);
    setIsConfirmationDialogOpen(false);
  };

  const handleFormSubmit = async (data: TServiceType) => {
    setIsConfirmationDialogOpen(true);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className="flex max-h-[720px] flex-col gap-2 overflow-y-auto px-2"
    >
      <Input id="id" type="hidden" {...form.register("id")} />
      <div className="space-y-1">
        <Label htmlFor="name">Názov</Label>
        <Input id="name" {...form.register("name")} />
        {form.formState.errors.name && (
          <span className="text-sm font-medium text-destructive">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Popis</Label>
        <Textarea id="description" {...form.register("description")} />
        {form.formState.errors.description && (
          <span className="text-sm font-medium text-destructive">
            {form.formState.errors.description.message}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="imageUrl">Image URL</Label>

        <Input id="imageUrl" {...form.register("imageUrl")} />
        {form.formState.errors.imageUrl && (
          <span className="text-sm font-medium text-destructive">
            {form.formState.errors.imageUrl.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="iconName">Icon Name</Label>
        <div className="flex flex-row items-center gap-1">
          <Input
            id="iconName"
            {...form.register("iconName")}
            className="w-2/3"
          />
          {form.formState.errors.iconName && (
            <span className="text-sm font-medium text-destructive">
              {form.formState.errors.iconName.message}
            </span>
          )}
          {renderIcon()}
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="hexColor">Farba</Label>
        <Controller
          control={form.control}
          name="hexColor"
          render={({ field }) => (
            <HexColorPicker color={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {fields.map((field, index) => (
        <div key={index} className="flex items-end gap-3">
          <div>
            <Label>Trvanie</Label>
            <Input
              type="number"
              {...form.register(
                `durationCosts.${index}.durationMinutes` as const,
              )}
            />
            {form.formState.errors.durationCosts &&
              form.formState.errors.durationCosts[index] &&
              form.formState.errors.durationCosts[index]!.durationMinutes && (
                <span className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors.durationCosts[index]!.durationMinutes!
                      .message
                  }
                </span>
              )}
          </div>
          <div>
            <Label>Cena</Label>
            <Input
              type="number"
              {...form.register(`durationCosts.${index}.cost` as const)}
            />
            {form.formState.errors.durationCosts &&
              form.formState.errors.durationCosts[index] &&
              form.formState.errors.durationCosts[index]!.cost && (
                <span className="text-sm font-medium text-destructive">
                  {form.formState.errors.durationCosts[index]!.cost!.message}
                </span>
              )}
          </div>
          <Button
            className="bg-destructive hover:bg-destructive hover:bg-red-400"
            type="button"
            onClick={() => remove(index)}
          >
            Odstrániť
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ durationMinutes: 0, cost: 0 })}
      >
        Pridať ďalšie
      </Button>
      <FormConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
        onConfirm={() => onConfirmDialog(form.getValues())}
      ></FormConfirmationDialog>
      {children}
    </form>
  );
};

export default ServiceTypeForm;
