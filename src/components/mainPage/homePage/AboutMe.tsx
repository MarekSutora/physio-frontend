import React from "react";
import Image from "next/image";

import image from "@/root/public/studio11.png";

const AboutMe = () => {
  return (
    <section className="m-auto flex h-full w-11/12 flex-col gap-6 pb-10 md:pt-20 pt-10 md:min-h-[500px] lg:w-[61.8%] lg:flex-row lg:items-center lg:gap-10">
      <div className="relative m-auto h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:m-0">
        <div className="absolute lg:-bottom-4 lg:-left-4 -bottom-2 -left-2 z-0 h-[400px] w-[400px] rounded-lg bg-primary/50 shadow-lg md:block md:h-[500px] md:w-[500px]"></div>
        <div className="relative z-10 h-[400px] w-[400px] shadow-lg md:h-[500px] md:w-[500px]">
          <Image
            src={image}
            alt="physiotherapist"
            className="rounded-lg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-grow pt-4">
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
