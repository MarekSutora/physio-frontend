"use client";

import React, { useState } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/components/ui/use-toast";
import { registerClientAction } from "@/lib/actions/authActions";
import DashboardSectionWrapper from "../dashboard/common/DashboardSectionWrapper";

const passwordSchema = z
  .string()
  .min(7, { message: "Heslo musí obsahovať aspoň 7 znakov." })
  .regex(/\d/, { message: "Heslo musí obsahovať aspoň jednu číslicu." })
  .regex(/[a-z]/, { message: "Heslo musí obsahovať aspoň jedno malé písmeno." })
  .regex(/[A-Z]/, {
    message: "Heslo musí obsahovať aspoň jedno veľké písmeno.",
  })
  .regex(/\W/, {
    message: "Heslo musí obsahovať aspoň jeden nealfanumerický znak.",
  });

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Meno je povinné. 🙄")
      .max(50, "Meno nesmie mať viac ako 50 znakov. 🙄"),
    lastName: z
      .string()
      .min(1, "Priezvisko je povinné. 🙄")
      .max(50, "Priezvisko nesmie mať viac ako 50 znakov. 🙄"),
    phoneNumber: z.string().min(1, "Telefónne číslo musí byť vyplnené. 🙄"),
    email: z.string().email("Neplatná emailová adresa. 🙄"),
    password: passwordSchema,
    confirmedPassword: z.string(),
    termsAndConditions: z
      .boolean()
      .refine((val) => val === true, "Musíte súhlasiť. 🙄"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Heslá sa musia zhodovať. 🙄",
    path: ["confirmedHeslo"],
  });

type RegistrationFormData = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmedPassword: "",
      termsAndConditions: false,
    },
  });

  const handleSubmit = async (formData: RegistrationFormData) => {
    setIsLoading(true);
    try {
      const result = await registerClientAction({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      });

      if (!result.success) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Registrácia zlyhala. 🙁",
          description: result.message,
          className: "text-lg",
          duration: 5000,
        });
      } else {
        setIsLoading(false);
        setRegistrationSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Chyba pri registrácii. 🙁",
        description:
          "Nepodarilo sa spracovať registráciu. Skúste to znova neskôr. 🙄",
        className: "text-lg",
        duration: 5000,
      });
    }
  };

  if (registrationSuccess) {
    return (
      <DashboardSectionWrapper>
        <div className="m-3 rounded-lg border-2 border-green-700/70 bg-green-300 p-5 text-center text-green-900">
          <h1 className="text-2xl font-semibold">Registrácia Úspešná!</h1>
          <p>Prosím, skontrolujte svoj email na potvrdenie účtu.</p>
        </div>
      </DashboardSectionWrapper>
    );
  }

  return (
    <div className="flex w-96 flex-col justify-start">
      {isLoading ? (
        <ClipLoader
          color={"#298294"}
          loading={isLoading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <h1 className="mb-2 text-center text-4xl font-bold text-gray-800">
            Registrácia 📝
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col"
            >
              <div className="flex flex-row gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
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
                <FormField
                  control={form.control}
                  name="lastName"
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
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
              <FormField
                control={form.control}
                name="confirmedPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potvrdenie hesla</FormLabel>
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
                        <Link
                          href="/obchodne-podmienky"
                          className="text-blue-500"
                        >
                          obchodnými podmienkami
                        </Link>{" "}
                        a{" "}
                        <Link
                          href="/ochrana-sukromia"
                          className="text-blue-500"
                        >
                          ochranou osobných údajov
                        </Link>
                        .
                      </FormLabel>
                    </div>
                    <FormMessage className="mb-2" />
                  </FormItem>
                )}
              />
              <Button
                className="mt-2 w-full bg-primary active:scale-95"
                type="submit"
                aria-label="Zaregistrovať sa"
              >
                Zaregistrovať sa
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default RegistrationForm;
