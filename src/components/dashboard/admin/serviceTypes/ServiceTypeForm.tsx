"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { TCU_ServiceType } from "@/lib/shared/types";

const durationCostSchema = z.object({
  durationMinutes: z.coerce
    .number()
    .int()
    .min(1, { message: "Duration must be at least 1 minute" }),
  cost: z.coerce.number().min(0, { message: "Cost cannot be negative" }),
});

const formSchema = z.object({
  id: z.any().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  hexColor: z.string().min(1, { message: "Hex color is required" }),
  durationCosts: z.array(durationCostSchema),
});

type Props = {
  serviceType: TCU_ServiceType | null;
  children: React.ReactNode;
  onSubmit: SubmitHandler<TCU_ServiceType>;
};

const ServiceTypeForm = ({ serviceType, children, onSubmit }: Props) => {
  const form = useForm<TCU_ServiceType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: serviceType?.id ?? null,
      name: serviceType?.name ?? "",
      description: serviceType?.description ?? "",
      hexColor: serviceType?.hexColor ?? "#aabbcc",
      durationCosts: serviceType?.durationCosts ?? [
        { durationMinutes: 0, cost: 0 },
      ],
    },
  });

  // useEffect(() => {
  //   form.reset({
  //     id: serviceType?.id ?? null,
  //     name: serviceType?.name ?? "",
  //     description: serviceType?.description ?? "",
  //     hexColor: serviceType?.hexColor ?? "#aabbcc",
  //     durationCosts: serviceType?.durationCosts ?? [
  //       { durationMinutes: 0, cost: 0 },
  //     ],
  //   });
  // }, [serviceType, form.reset, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "durationCosts",
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
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
      {children}
    </form>
  );
};

export default ServiceTypeForm;
