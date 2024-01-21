import Link from "next/link";
import React from "react";

type Props = {};

const LoginForm = (props: Props) => {
  return (
    <div className="mt-10 flex w-96 flex-col justify-start md:mt-24">
      <h1 className="text-center text-4xl font-bold text-gray-800">
        Vitajte späť!
      </h1>
      <form className="mt-4 flex flex-col">
        <label htmlFor="email" className="mb-1 ml-1 font-semibold">
          Email
        </label>
        <input type="email" className="mb-2 rounded-md border-2 p-2" />
        <label htmlFor="password" className="mb-1 ml-1 font-semibold">
          Heslo
        </label>
        <input type="password" className="mb-2 rounded-md border-2 p-2" />
        <div className="mb-2 ml-1 mt-1 flex items-center justify-between">
          <div>
            <input
              id="remember-me"
              type="checkbox"
              className="mr-2 scale-125 accent-primary"
            />
            <label htmlFor="remember-me" className="select-none text-sm">
              Zapamätať si ma
            </label>
          </div>
          <Link
            href="../zabudnute-heslo"
            className="hidden text-sm text-slate-800 underline md:block"
          >
            Zabudli ste heslo?
          </Link>
        </div>
        <button
          type="button"
          className="m-auto mb-2 mt-1 w-5/6 rounded-md bg-secondary py-2 text-white hover:bg-primary focus:bg-primary"
        >
          Prihlásiť sa
        </button>
        <Link
          href="../zabudnute-heslo"
          className="text-sm text-slate-800 underline md:hidden"
        >
          Zabudli ste heslo?
        </Link>
        <div className="mt-3 flex w-full flex-row items-center justify-between">
          <div className="h-[1px] w-[33%] bg-slate-300"></div>
          <Link
            href="/registracia"
            className="text-sm text-slate-800 underline"
          >
            Vytvoriť účet
          </Link>
          <div className="my-auto h-[1px] w-[33%] bg-slate-300"></div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
