"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createNewServiceTypeAction } from "@/lib/actions/serviceTypeActions";
import ServiceTypeForm from "./ServiceTypeForm";
import { TServiceType } from "@/lib/shared/types";

//TODO layout pre md je zly, modal - ste si isty ze toto je spravne?

type Props = {};

const AddServiceTypeForm = (props: Props) => {
  const { toast } = useToast();

  const handleSubmit = async (values: TServiceType) => {
    try {
      await createNewServiceTypeAction(values);
      toast({
        variant: "success",
        title: "Úspešne pridaná nová služba. 🎉",
        className: "text-lg",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Nepodarilo sa pridať. 🙄",
        className: "text-lg",
      });
    }
  };

  return (
    <ServiceTypeForm serviceType={null} onSubmit={handleSubmit}>
      <Button className="mt-5" type="submit">
        Odoslať
      </Button>
    </ServiceTypeForm>
  );
};

export default AddServiceTypeForm;
