import Link from "next/link";
import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form"; // Import the required components from Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

type LoginForm = {
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginForm) => {
    console.log(values);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(res);
    if (!res?.error) {
      //router.push("http://localhost:3000");
    }
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="mb-2" {...field} />
                </FormControl>
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
            className="m-auto mb-2 mt-1 w-5/6 bg-secondary text-white hover:bg-primary focus:bg-primary"
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
    </div>
  );
};

export default LoginForm;
