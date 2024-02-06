import MakeReservation from "@/components/mainPage/reservations/MakeReservation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <section className="m-auto min-h-[600px] w-5/6 py-2 lg:p-8">
      <MakeReservation />
    </section>
  );
};

export default Page;
