"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust the import paths based on your project structure

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

// Define form schema using Zod
const formSchema = z.object({
  email: z.string().email("Neplatná emailová adresa."),
  subject: z.string(),
  phoneNumber: z.string().optional(),
  message: z.string().min(5, "Správa musí mať aspoň 5 znakov."),
});

type ContactFormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {

    // Handle form data submission
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-4xl font-semibold text-gray-800">
        Kontaktný formulár
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        ></form>
      </Form>
    </div>
  );
};

export default ContactForm;
