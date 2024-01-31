import MultipleSelector from "@/components/ui/multipleselector";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <section className="h-full w-full border-slate-200 bg-white p-2 md:rounded-lg md:border-2">
        <h1 className="text-center text-xl font-medium pb-2">
          Vytvoriť nový termín
        </h1>
        <MultipleSelector />
      </section>
      <section className="h-full w-full border-slate-200 bg-white p-2 md:rounded-lg md:border-2"></section>
    </div>
  );
};

export default Page;
