"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createNewServiceTypeAction } from "@/lib/actions/serviceTypeActions";
import { TServiceType } from "@/lib/shared/types";

//TODO layout pre md je zly, modal - ste si isty ze toto je spravne?

const durationCostSchema = z.object({
  durationMinutes: z.coerce
    .number()
    .int()
    .min(1, { message: "Duration must be at least 1 minute" }),
  cost: z.coerce.number().min(0, { message: "Cost cannot be negative" }),
});

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  hexColor: z.string().min(1, { message: "Hex color is required" }),
  serviceTypeDurationCosts: z.array(durationCostSchema),
});

type Props = {
  serviceType: TServiceType | null;
  children: React.ReactNode;
  onSubmit: SubmitHandler<TServiceType>;
};

type ServiceTypeFormData = z.infer<typeof formSchema>;

const ServiceTypeForm = ({ serviceType, children, onSubmit }: Props) => {
  const { toast } = useToast();

  const defaultValues = serviceType
    ? {
        name: serviceType.name,
        description: serviceType.description,
        hexColor: serviceType.hexColor,
        serviceTypeDurationCosts: serviceType.serviceTypeDurationCosts,
      }
    : {
        name: "",
        description: "",
        hexColor: "#aabbcc",
        serviceTypeDurationCosts: [{ durationMinutes: 0, cost: 0 }],
      };

  const form = useForm<TServiceType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "serviceTypeDurationCosts",
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
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
        <div key={field.id} className="flex items-end gap-3">
          <div>
            <Label>Trvanie</Label>
            <Input
              type="number"
              {...form.register(
                `serviceTypeDurationCosts.${index}.durationMinutes` as const,
              )}
            />
            {form.formState.errors.serviceTypeDurationCosts &&
              form.formState.errors.serviceTypeDurationCosts[index] &&
              form.formState.errors.serviceTypeDurationCosts[index]!
                .durationMinutes && (
                <span className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors.serviceTypeDurationCosts[index]!
                      .durationMinutes!.message
                  }
                </span>
              )}
          </div>
          <div>
            <Label>Cena</Label>
            <Input
              type="number"
              {...form.register(
                `serviceTypeDurationCosts.${index}.cost` as const,
              )}
            />
            {form.formState.errors.serviceTypeDurationCosts &&
              form.formState.errors.serviceTypeDurationCosts[index] &&
              form.formState.errors.serviceTypeDurationCosts[index]!.cost && (
                <span className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors.serviceTypeDurationCosts[index]!.cost!
                      .message
                  }
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
