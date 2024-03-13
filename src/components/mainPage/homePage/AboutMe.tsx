import React from "react";
import Image from "next/image";

import image from "@/root/public/studio11.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Props = {};

const AboutMe = (props: Props) => {
  return (
    <section className="m-auto flex h-full min-h-[500px] w-11/12 flex-col gap-6 pb-10 pt-20 lg:w-[61.8%] lg:flex-row lg:items-center lg:gap-10">
      <div className="relative m-auto h-[500px] w-[500px] lg:m-0">
        <div className="absolute -bottom-4 -left-4 z-0 h-[500px] w-[500px] rounded-lg bg-primary/50 shadow-lg"></div>
        <div className="relative z-10 h-[500px] w-[500px] shadow-lg">
          <Image src={image} alt="physiotherapist" className="rounded-lg" />
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-grow">
        <h1 className="text-left text-4xl font-semibold">About</h1>
        <hr className="my-4 border-t border-slate-200" />
        <p className="text-justify text-lg lg:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          neque dignissimos accusamus esse veniam suscipit voluptas molestias
          consectetur nam sit incidunt vero iusto, temporibus praesentium optio?
        </p>
        <h2 className="mb-2 mt-6 text-2xl font-semibold">Specializations:</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Specialization 1</li>
          <li>Specialization 2</li>
        </ul>
        <h2 className="mb-2 mt-6 text-2xl font-semibold">Education:</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Education 1</li>
          <li>Education 2</li>
        </ul>
        <h2 className="mb-2 mt-6 text-2xl font-semibold">Experience:</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Experience 1</li>
          <li>Experience 2</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutMe;
