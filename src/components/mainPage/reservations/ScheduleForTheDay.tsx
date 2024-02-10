import {
  TG_AvailableReservation,
  TG_ServiceTypeWithCost,
} from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React from "react";
import ReservationCard from "./ReservationCard";

type Props = {
  // selectedDayReservations: AvailableReservation[];
  selectedDayReservations: TG_AvailableReservation[];
  selectedDay: Date;
};

const ScheduleForTheDay = ({ selectedDayReservations, selectedDay }: Props) => {
  return (
    <section className="w-full lg:w-[53%]">
      <h2 className="pb-4 text-center text-lg font-semibold text-gray-900">
        Rozvrh pre{" "}
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "do MMMM yyyy", {
            locale: sk,
          })}
        </time>
      </h2>
      <div className="max-h-[500px] w-full overflow-scroll">
        {selectedDayReservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </section>
  );
};

export default ScheduleForTheDay;
