"use client";

import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { Button } from "@/components/ui/button";
import { createNewServiceTypeAction } from "@/lib/actions/serviceTypesActions";
import ServiceTypeForm from "./ServiceTypeForm";
import { TCU_ServiceType } from "@/lib/shared/types";

const AddServiceTypeForm = () => {
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
      <Button className="mx-auto mt-5 w-full" type="submit">
        Pridať službu
      </Button>
    </ServiceTypeForm>
  );
};

export default AddServiceTypeForm;
