"use client";

import { useRouter } from "next/navigation";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/components/ui/use-toast";

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
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  const handleSubmit = async (values: RegistrationFormData) => {
    setIsLoading(true);
    const payload = {
      email: values.email,
      password: values.heslo,
      firstName: values.meno,
      lastName: values.priezvisko,
      phoneNumber: values.phoneNumber,
    };

    try {
      // Send the request to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/registerPatient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Skúste to prosím znova. 🙄";
        toast({
          variant: "destructive",
          title: "Registrácia zlyhala. 🙁",
          description: errorMessage,
          className: "text-lg",
        });
      } else {
        router.push("/prihlasenie");
      }
    } catch (error) {
      console.error("Failed to register:", error);
      toast({
        variant: "destructive",
        title: "Chyba pri registrácii. 🙁",
        description: "Nepodarilo sa spracovať registráciu. Skúste to znova. 🙄",
        className: "text-lg",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-96 flex-col justify-start">
      {isLoading ? (
        <ClipLoader
          color={"#14746F"}
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
                      <Input type="email" autoComplete="username" {...field} />
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

              {/* Submit Button */}
              <Button
                className="mt-2 w-full bg-primary active:scale-95"
                type="submit"
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
