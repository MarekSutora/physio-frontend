"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

// Define the type for your form fields
interface IFormInput {
  meno: string;
  priezvisko: string;
  predvolba: string;
  telefonneCislo: string;
  email: string;
  heslo: string;
  confirmedHeslo: string;
}

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Handle registration logic here
    console.log(data);
  };

  const password = watch("heslo");

  return (
    <div className="mt-10 flex w-96 flex-col justify-start md:mt-24">
      <h1 className="text-center text-4xl font-bold text-gray-800">Vitajte!</h1>
      <form className="mt-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row">
          {/* Meno */}
          <div className="flex flex-col md:mr-2 md:w-1/2">
            <label htmlFor="meno" className="mb-1 ml-1 font-semibold">
              Meno
            </label>
            <input
              id="meno"
              {...register("meno")} // Unrequired field
              className="mb-2 rounded-md border-2 p-2"
            />
          </div>
          {/* Priezvisko */}
          <div className="flex flex-col md:ml-2 md:w-1/2">
            <label htmlFor="priezvisko" className="mb-1 ml-1 font-semibold">
              Priezvisko
            </label>
            <input
              id="priezvisko"
              {...register("priezvisko")} // Unrequired field
              className="mb-2 rounded-md border-2 p-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Predvolba */}
          <div className="flex flex-col md:mr-2 md:w-1/3">
            <label htmlFor="predvolba" className="mb-1 ml-1 font-semibold">
              Predvoľba
            </label>
            <select
              id="predvolba"
              {...register("predvolba")} // Unrequired field
              className="mb-2 rounded-md border-2 p-2"
            >
              <option value="+421">+421</option>
              <option value="+420">+420</option>
              {/* Add other area codes as needed */}
            </select>
          </div>
          {/* Telefonne Cislo */}
          <div className="flex flex-col md:ml-2 md:w-2/3">
            <label htmlFor="telefonneCislo" className="mb-1 ml-1 font-semibold">
              Telefónne číslo
            </label>
            <input
              id="telefonneCislo"
              {...register("telefonneCislo")} // Unrequired field
              className="mb-2 rounded-md border-2 p-2"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 ml-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email je povinný",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email je neplatný",
              },
            })}
            className={`mb-2 rounded-md border-2 p-2 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="ml-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Heslo */}
        <div className="flex flex-col">
          <label htmlFor="heslo" className="mb-1 ml-1 font-semibold">
            Heslo
          </label>
          <input
            id="heslo"
            type="password"
            {...register("heslo", { required: "Heslo je povinné" })}
            className={`mb-2 rounded-md border-2 p-2 ${
              errors.heslo ? "border-red-500" : ""
            }`}
          />
          {errors.heslo && (
            <p className="ml-1 text-sm text-red-500">{errors.heslo.message}</p>
          )}
        </div>

        {/* Confirmed Heslo */}
        <div className="flex flex-col">
          <label htmlFor="confirmedHeslo" className="mb-1 ml-1 font-semibold">
            Potvrdenie hesla
          </label>
          <input
            id="confirmedHeslo"
            type="password"
            {...register("confirmedHeslo", {
              validate: (value) => value === password || "Heslá sa nezhodujú",
            })}
            className={`mb-2 rounded-md border-2 p-2 ${
              errors.confirmedHeslo ? "border-red-500" : ""
            }`}
          />
          {errors.confirmedHeslo && (
            <p className="ml-1 text-sm text-red-500">
              {errors.confirmedHeslo.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="m-auto mb-2 mt-1 w-5/6 rounded-md bg-secondary py-2 text-white hover:bg-primary focus:bg-primary"
        >
          Zaregistrovať sa
        </button>

        {/* Already have an account */}
        <div className="mt-3 flex w-full flex-row items-center justify-between">
          <div className="h-[1px] w-[33%] bg-slate-300"></div>
          <Link
            href="/prihlasenie"
            className="text-sm text-slate-800 underline"
          >
            Prihlásiť sa
          </Link>
          <div className="h-[1px] w-[33%] bg-slate-300"></div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
