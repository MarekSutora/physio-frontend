import {
  TG_AvailableReservation,
  TG_ServiceTypeWithCost,
} from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React from "react";
import { useSession } from "next-auth/react";

type ReservationCardProps = {
  // reservation: AvailableReservation;
  reservation: TG_AvailableReservation;
};

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const { data: session } = useSession();

  console.log("reservation", reservation);

  //TODO style this

  const tryBookReservation = async () => {
    if (session?.user) {
      //await bookReservationAction(reservation.id); //TODO
    } else {
        //TODO 
    }
  }

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border-l border-r border-t px-3 py-1 last:border-b">
      <div className="pl-2 text-lg font-semibold">
        {format(new Date(reservation.startTime), "HH:mm", { locale: sk })}
      </div>
      {reservation.serviceTypesWithCosts.map(
        (item: TG_ServiceTypeWithCost, index: any) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg p-2"
            style={{ backgroundColor: `${item.hexColor}20` }}
          >
            <div className="flex flex-row items-center justify-between">
              <span className="font-semibold">{item.serviceTypeName}</span>
              <span className="text-base">
                Kapacita: {reservation.capacity}
              </span>
            </div>
            <div className="text-sm">
              Trvanie: {item.durationMinutes} min | Cena: {item.cost} €
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="text-sm">
                Voľné miesta:{" "}
                <span className="font-semibold">
                  {reservation.capacity - reservation.reservedAmount}
                </span>
              </div>
              <button
                onClick={tryBookReservation}
                className="text-md rounded-sm border border-secondary bg-white px-[6px]
                 py-[5px] font-semibold text-secondary shadow-lg transition-all ease-in-out hover:bg-secondary hover:text-slate-50"
              >
                Rezervovať
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default ReservationCard;
