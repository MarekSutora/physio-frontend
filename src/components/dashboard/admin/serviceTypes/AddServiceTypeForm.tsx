"use client";

import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { Button } from "@/components/ui/button";
import { createNewServiceTypeAction } from "@/lib/actions/serviceTypesActions";
import ServiceTypeForm from "./ServiceTypeForm";
import { TServiceType } from "@/lib/shared/types";
import { getErrorMessage } from "@/lib/utils/utils";

const AddServiceTypeForm = () => {
  const { toast } = useToast();

  const handleSubmit = async (values: TServiceType) => {
    try {
      await createNewServiceTypeAction(values);
      toast({
        variant: "success",
        description: "Úspešne pridaná nová služba. 🎉",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: getErrorMessage(error),
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
