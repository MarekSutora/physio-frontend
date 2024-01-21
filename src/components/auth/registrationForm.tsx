"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// Define the form schema using Zod

const formSchema = z
  .object({
    meno: z
      .string()
      .min(1, "Meno je povinné. 🙄")
      .max(50, "Meno nesmie mať viac ako 50 znakov. 🙄"),
    priezvisko: z
      .string()
      .min(1, "Priezvisko je povinné. 🙄")
      .max(50, "Priezvisko nesmie mať viac ako 50 znakov. 🙄"),
    phoneNumber: z.string().min(1, "Telefónne číslo musí byť vyplnené. 🙄"),
    email: z.string().email("Neplatná emailová adresa. 🙄"),
    heslo: z.string().min(5, "Heslo musí mať aspoň 5 znakov. 🙄"),
    confirmedHeslo: z.string(),
    termsAndConditions: z
      .boolean()
      .refine((val) => val === true, "Musíte súhlasiť. 🙄"),
  })
  .refine((data) => data.heslo === data.confirmedHeslo, {
    message: "Heslá sa musia zhodovať. 🙄",
    path: ["confirmedHeslo"],
  });

type RegistrationFormData = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meno: "",
      priezvisko: "",
      phoneNumber: "",
      email: "",
      heslo: "",
      confirmedHeslo: "",
      termsAndConditions: false,
    },
  });

  const handleSubmit = (values: RegistrationFormData) => {
    console.log(values);
  };

  return (
    <div className="flex w-96 flex-col justify-start">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-2">
        Registrácia 📝
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col"
        >
          <div className="flex flex-row gap-5">
            {/* Meno */}
            <FormField
              control={form.control}
              name="meno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Priezvisko */}
            <FormField
              control={form.control}
              name="priezvisko"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priezvisko</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Telefonne Cislo */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefónne číslo</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Heslo */}
          <FormField
            control={form.control}
            name="heslo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heslo</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirmed Heslo */}
          <FormField
            control={form.control}
            name="confirmedHeslo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potvrdenie hesla</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms and Conditions Checkbox */}
          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <div className="mt-3 flex flex-row gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="leading-5">
                    Súhlasím s{" "}
                    <Link href="/obchodne-podmienky" className="text-blue-500">
                      obchodnými podmienkami
                    </Link>{" "}
                    a{" "}
                    <Link href="/ochrana-sukromia" className="text-blue-500">
                      ochranou osobných údajov
                    </Link>
                    .
                  </FormLabel>
                </div>
                <FormMessage className="mb-2" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            className="mt-2 w-full bg-primary active:scale-95"
            type="submit"
          >
            Zaregistrovať sa
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
