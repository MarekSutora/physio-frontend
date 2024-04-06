import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import MainPictureAnimated from "./MainPictureAnimated";


const MainPicture = () => {
  const words = "„Lorem ipsum dolor sit amet, consectetur adipiscing elit.“";

  return (
    <section className="relative mb-10 h-[400px] w-full text-center drop-shadow-lg lg:h-[600px]">
      <div className="relative h-full w-full overflow-hidden saturate-[1.3]">
        <MainPictureAnimated />
      </div>

      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-primary/50" />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-bold text-white drop-shadow-2xl md:text-9xl">
          Lorem Ipsum
        </h1>
        <div className="mt-4 h-0.5 w-40 bg-white md:w-80" />
        <TextGenerateEffect
          words={words}
          className="text-lg font-medium text-white drop-shadow-2xl md:text-3xl"
        />
      </div>
      <div className="absolute -bottom-[50px] flex w-full flex-row items-center justify-center">
        <div
          className="flex h-[100px] w-10/12 flex-row items-center rounded-full border-2 border-primary font-medium lg:w-6/12"
          style={{
            background: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23337783' fill-opacity='0.43' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E"), #6695a1`,
          }}
        >
          <Link
            href="/rezervacia"
            className="group flex h-full w-1/2 flex-col items-center justify-center text-wrap rounded-l-full text-lg text-white drop-shadow-lg hover:bg-[#6695a1] hover:drop-shadow-none lg:text-2xl"
          >
            <span>{"Máte záujem?"}</span>
            <span>{"Objednajte sa."}</span>
          </Link>
          <div className="h-5/6 w-0.5 bg-primary" />
          <Link
            href="/kontakt"
            className="group flex h-full w-1/2 flex-col items-center justify-center text-wrap rounded-r-full text-lg text-white drop-shadow-lg hover:bg-[#6695a1] hover:drop-shadow-none lg:text-2xl"
          >
            <span>{"Máte otázku?"}</span>
            <span>{"Kontaktujte nás."}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPicture;
