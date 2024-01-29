import { AvailableReservation } from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React from "react";

type Props = {
  selectedDayReservations: AvailableReservation[];
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

type ReservationCardProps = {
  reservation: AvailableReservation;
};

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border-l border-r border-t px-3 py-1 last:border-b">
      <div className="pl-2 text-lg font-semibold">
        {format(new Date(reservation.date), "HH:mm", { locale: sk })}
      </div>
      {reservation.activityTypes.map((activityType, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-lg p-2"
          style={{ backgroundColor: `${activityType.hexColor}20` }}
        >
          <div className="flex flex-row items-center justify-between">
            <span className="font-semibold">{activityType.name}</span>
            <span className="text-base">Kapacita: {reservation.capacity}</span>
          </div>
          <div className="text-sm">
            Trvanie: {activityType.duration} min | Cena: {activityType.cost} €
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm">
              Voľné miesta:{" "}
              <span className="font-semibold">
                {reservation.capacity - reservation.reservedAmount}
              </span>
            </div>
            <button
              className="text-md rounded-sm border border-secondary bg-white px-[6px]
               py-[5px] font-semibold text-secondary shadow-lg transition-all ease-in-out hover:bg-secondary hover:text-slate-50"
            >
              Rezervovať
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleForTheDay;
