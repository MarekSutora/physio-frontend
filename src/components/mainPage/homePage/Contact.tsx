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
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactInfo, socialMediaLinks } from "@/lib/shared/constants";
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Meno je povinné. 🙄"),
  secondName: z.string().min(1, "Priezvisko je povinné. 🙄"),
  email: z.string().email("Neplatná emailová adresa. 🙄"),
  phoneNumber: z.string(),
  message: z.string().min(5, "Správa musí mať aspoň 5 znakov. 🙄").max(1000),
});

type ContactData = z.infer<typeof formSchema>;

const Contact = () => {
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

  const onSubmit: SubmitHandler<ContactData> = (data) => {
    // Handle form data submission
  };

  return (
    <div className="w-full bg-slate-50" id="kontakt">
      <div className="flex w-full flex-row gap-3 pb-6">
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Kontakt
        </h1>
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
      </div>
      <section className="m-auto w-[61.8%] pb-10">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-10">
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
                      <FormLabel className="text-md">Meno</FormLabel>
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
                      <FormLabel className="text-md">Priezvisko</FormLabel>
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
                    <FormLabel className="text-md">Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
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
                    <FormLabel className="text-md">Správa</FormLabel>
                    <FormControl>
                      <Textarea className="h-52" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-secondary focus:bg-secondary"
              >
                Odoslať
              </Button>
            </form>
          </Form>
          <section className="flex w-full flex-col gap-2 text-nowrap text-center lg:w-1/3">
            <h1 className="text-3xl font-bold lg:pt-6">
              {contactInfo.companyName}
            </h1>
            <section>
              <h2 className="pt-6 text-2xl font-semibold">Adresa:</h2>
              <p className="pt-3 text-xl ">{contactInfo.address}</p>
              <p className="pt-3  text-xl ">
                {contactInfo.zip} {contactInfo.city}
              </p>
            </section>
            <section>
              <h2 className="pt-6 text-2xl font-semibold ">Kontaktné údaje:</h2>
              <a
                className="mx-auto flex justify-center gap-2 pt-3 text-center text-xl md:mx-0"
                href={`mailto:${contactInfo.email}`}
              >
                <div className="mt-[1px] text-3xl ">
                  <IoIosMail />
                </div>
                <span>{contactInfo.email}</span>
              </a>
              <div className="mx-auto flex items-center justify-center gap-2 pt-3 text-xl  md:mx-0">
                <div className="text-3xl">
                  <FaPhone className="h-[25px] w-[30px]" />
                </div>
                <span>{contactInfo.telephoneNumber}</span>
              </div>
            </section>
            <nav>
              <h2 className="pb-1 pt-6 text-2xl font-semibold ">
                Sociálne siete:
              </h2>
              <ul className="flex flex-row justify-around pt-9 text-primary lg:justify-around">
                {socialMediaLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path}>
                      <div className="scale-[2.4] text-2xl transition-all duration-300 ease-in-out hover:scale-[2.7]">
                        {link.icon}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Contact;
