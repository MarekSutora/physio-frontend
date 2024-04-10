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
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import { forgotPasswordAction } from "@/lib/actions/authActions";
import ClipLoader from "react-spinners/ClipLoader";

const schema = z.object({
  email: z.string().email("Neplatná emailová adresa. 🙄"),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      await forgotPasswordAction(formData.email);
      setEmailSent(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred sending the password reset email",
      });
    }
    setLoading(false);
  };

  return (
    <div className="m-auto flex min-h-[645px] w-[400px] items-center justify-center">
      {loading ? (
        <ClipLoader
          color={"#298294"}
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <DashboardSectionWrapper >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-auto w-5/6"
            >
              {!emailSent ? (
                <div className="mt-4 flex-col items-center justify-center">
                  <h2 className="mb-3 text-center text-2xl font-semibold">
                    Zabudli ste heslo?
                  </h2>
                  <p className="mb-3 text-center text-sm">
                    Zadajte svoju emailovú adresu a my vám pošleme inštrukcie na
                    obnovenie hesla.
                  </p>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} autoFocus={true} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mb-5 mt-2 w-full">
                    Potvrdiť
                  </Button>
                  <Link
                    href="/prihlasenie"
                    className=" text-blue-500 underline underline-offset-1"
                  >
                    Naspäť na prihlásenie
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <p>
                    Bol Vám odoslaný e-mail s inštrukciami na obnovenie hesla.
                  </p>
                  <Link
                    href="/prihlasenie"
                    className=" text-blue-500 underline underline-offset-1"
                  >
                    Naspäť na prihlásenie
                  </Link>
                </div>
              )}
            </form>
          </Form>
        </DashboardSectionWrapper>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
