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
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { sendContactFormEmail } from "@/lib/actions/generalActions";
import ClipLoader from "react-spinners/ClipLoader";
import { cn } from "@/lib/utils/utils";

const formSchema = z.object({
  name: z.string().min(1, "Meno je povinné. 🙄"),
  secondName: z.string().min(1, "Priezvisko je povinné. 🙄"),
  email: z.string().email("Neplatná emailová adresa. 🙄"),
  phoneNumber: z.string(),
  message: z.string().min(5, "Správa musí mať aspoň 5 znakov. 🙄").max(1000),
});

type ContactData = z.infer<typeof formSchema>;

const Contact = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<ContactData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      secondName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setIsLoading(true);

    try {
      await sendContactFormEmail(data);

      setIsLoading(false);

      toast({
        variant: "success",
        title:
          "Správa bola úspešne odoslaná. Ďakujeme, odpovieme Vám hneď ako to bude možné. 😊",
        className: "text-lg",
        duration: 10000,
      });
      form.reset();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Chyba pri odosielaní správy.",
        className: "text-lg",
      });
    }
  };

  return (
    <div
      className={cn(
        isLoading && "flex h-full w-full items-center justify-center p-0",
        "flex w-full flex-col gap-10 lg:flex-row lg:gap-10",
      )}
    >
      {isLoading ? (
        <ClipLoader
          color={"#298294"}
          loading={isLoading}
          cssOverride={{
            width: "300px",
            height: "300px",
            display: "block",
            margin: "0 auto",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="flex h-full w-full items-center justify-center"
        />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 lg:pr-28"
          >
            <div className="flex flex-row gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="text-md">
                      Meno <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="text-md">
                      Priezvisko <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-md">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-md">Telefónne číslo</FormLabel>
                  <FormControl>
                    <Input type="tel" autoComplete="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-md">
                    Správa <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="h-52" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 focus:bg-primary/90"
            >
              Odoslať
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Contact;
