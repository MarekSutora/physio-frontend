"use client";

import Link from "next/link";
import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form"; // Import the required components from Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ClipLoader from "react-spinners/ClipLoader";
import { getErrorMessage } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type LoginForm = {
  email: string;
  password: string;
};

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email musi byť vyplnený.")
    .email("Neplatná emailová adresa."),
  password: z
    .string()
    .min(1, "Heslo musí byť vyplnené.")
    .max(256, "Heslo je príliš dlhé."),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm = ({ searchParams }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    try {
      setIsLoading(true);

      const res = await signIn<"credentials">(
        "credentials",
        {
          email: values.email,
          password: values.password,
          redirect: false,
        },
        undefined,
      );
      if (res?.error) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Chyba pri prihlasovaní. 🙁",
          description:
            getErrorMessage(res?.error) === "fetch failed"
              ? "Skúste to prosím neskôr."
              : getErrorMessage(res?.error) + " 🙄",
          className: "text-lg",
        });
      } else {
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba pri prihlasovaní. 🙁",
        description: getErrorMessage(error) + " 🙄",
        className: "text-lg",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-96 flex-col justify-start ">
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
          {searchParams.reset === "success" && (
            <div className="m-3 rounded-lg border-2 border-green-700/70 bg-green-300 p-5 text-center text-green-900">
              <h1 className="text-2xl font-semibold">
                Obnovenie hesla úspešné!
              </h1>
              <p>Prosím, prihláste sa pomocou nového hesla.</p>
            </div>
          )}
          {searchParams.emailConfirmed === "success" && (
            <div className="m-3 rounded-lg border-2 border-green-700/70 bg-green-300 p-5 text-center text-green-900">
              <h1 className="text-2xl font-semibold">
                Potvrdenie emailu úspešné!
              </h1>
              <p>Teraz sa mozete prihlasit.</p>
            </div>
          )}

          <h1 className="text-center text-4xl font-bold text-gray-800">
            Vitajte späť! 🏋🏻
          </h1>
          <Form {...form}>
            <form
              className="mt-4 flex flex-col"
              onSubmit={form.handleSubmit(handleSubmit)}
              autoComplete="on"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="mb-2"
                        autoComplete="email"
                        {...field}
                      />
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
                        autoComplete="current-password"
                        className="mb-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-2 mt-3 flex items-center justify-end">
                <Link
                  href="../zabudnute-heslo"
                  className="text-sm text-slate-800 underline"
                >
                  Zabudli ste heslo?
                </Link>
              </div>

              <Button
                type="submit"
                className="m-auto mb-2 mt-1 w-5/6 bg-primary text-white hover:bg-primary/85 focus:bg-primary"
                aria-label="Prihlásiť sa"
              >
                Prihlásiť sa
              </Button>
            </form>

            <Link
              href="/registracia"
              className="text-sm text-slate-800 underline md:hidden"
            >
              Vytvoriť účet
            </Link>

            <div className="mt-3 hidden w-full items-center justify-between md:flex">
              <div className="h-[1px] w-[33%] bg-slate-300"></div>
              <Link
                href="/registracia"
                className="text-sm text-slate-800 underline"
              >
                Vytvoriť účet
              </Link>
              <div className="h-[1px] w-[33%] bg-slate-300"></div>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
