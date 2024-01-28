import Calendar from "@/components/reservations/Calendar";
import React from "react";

type Props = {};

const Reservations = (props: Props) => {
  return (
    <section className="m-auto w-full sm:w-5/6 md:4/6">
      <Calendar />
    </section>
  );
};

export default Reservations;
