"use client";

import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { Button } from "@/components/ui/button";
import { createNewServiceTypeAction } from "@/lib/actions/serviceTypesActions";
import ServiceTypeForm from "./ServiceTypeForm";
import { TCU_ServiceType } from "@/lib/shared/types";

type Props = {};

const AddServiceTypeForm = (props: Props) => {
  const { toast } = useToast();

  const handleSubmit = async (values: TCU_ServiceType) => {
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
