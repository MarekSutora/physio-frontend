import Link from "next/link";
import React from "react";
import { Form, FormItem, FormLabel, FormControl } from "@components/ui/form"; // Import the required components from Shadcn
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

type Props = {};

type LoginForm = {
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: LoginForm) => {
    console.log(values);
  };

  return (
    <div className="flex w-96 flex-col justify-start ">
      <h1 className="text-center text-4xl font-bold text-gray-800">
        Vitajte späť!
      </h1>
      <Form {...form}>
        <form
          className="mt-4 flex flex-col"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input type="email" id="email" className="mb-2" />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="password">Heslo</FormLabel>
            <FormControl>
              <Input type="password" id="password" className="mb-2" />
            </FormControl>
          </FormItem>

          <div className="mb-2 mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" className="mr-2" />
              <FormLabel htmlFor="remember-me" className="select-none text-sm">
                Zapamätať si ma
              </FormLabel>
            </div>
            <Link
              href="../zabudnute-heslo"
              className="text-sm text-slate-800 underline"
            >
              Zabudli ste heslo?
            </Link>
          </div>

          <Button
            type="submit"
            className="m-auto mb-2 mt-1 w-5/6 bg-secondary text-white hover:bg-primary focus:bg-primary"
          >
            Prihlásiť sa
          </Button>

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
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
