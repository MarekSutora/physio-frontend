"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import { useToast } from "@/components/ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { TResetPasswordFormData } from "@/lib/shared/types";
import { resetPasswordAction } from "@/lib/actions/authActions";

// Define the form schema using Zod
const formSchema = z
  .object({
    password: z.string().min(5, "Heslo musí mať aspoň 5 znakov."),
    confirmPassword: z.string(),
    token: z.string(),
    email: z.string().email("Neplatná emailová adresa."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Heslá sa musia zhodovať.",
    path: ["confirmPassword"],
  });

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ResetPasswordForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = props.searchParams.token;
  const email = props.searchParams.email;
  const { toast } = useToast();

  const form = useForm<TResetPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData: TResetPasswordFormData) => {
    setLoading(true);

    console.log("formData", formData);

    try {
      await resetPasswordAction(formData);
      toast({
        title: "Success",
        description: "Password reset successful",
      });
      router.push("/prihlasenie?emailConfirmed=success");
    } catch (error) {
      console.error("Error resetting password", error);
      toast({
        title: "Error",
        description: "An error occurred resetting the password",
      });
    }
    setLoading(false);
  };

  return (
    <DashboardSectionWrapper additionalClasses="m-auto flex  w-[350px] h-[310px]">
      {loading ? (
        <ClipLoader
          color={"#14746F"}
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-2"
          >
            <Input type="hidden" value={token} {...form.register("token")} />
            <Input type="hidden" value={email} {...form.register("email")} />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter new password"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm new password"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-[220px]">
              Reset Password
            </Button>
          </form>
        </Form>
      )}
    </DashboardSectionWrapper>
  );
};

export default ResetPasswordForm;
