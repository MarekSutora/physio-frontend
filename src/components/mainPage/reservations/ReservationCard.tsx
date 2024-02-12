import {
  ServiceTypeOptionType,
  TG_AvailableReservation,
  TG_ServiceTypeWithCost,
} from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClientBookedReservationAction } from "@/lib/actions/reservationActions";
import { getErrorMessage } from "@/lib/utils";

type ReservationCardProps = {
  // reservation: AvailableReservation;
  reservation: TG_AvailableReservation;
  selectedServiceTypeNames: string[];
};

const ReservationCard = ({
  reservation,
  selectedServiceTypeNames,
}: ReservationCardProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const visibleServiceTypes = reservation.serviceTypesWithCosts.filter(
    (stwc) => selectedServiceTypeNames.includes(stwc.serviceTypeName), // Match based on service type name
  );

  console.log("reservation", reservation);

  //TODO style this

  const tryBookReservation = async () => {
    if (session?.user) {
      try {
        await createClientBookedReservationAction(session?.user.id);

        toast({
          variant: "success",
          title: "Reservation created successfully!",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: getErrorMessage(error),
        });
      }
    }
  };
  const handleDeleteButtonClick = () => {
    // Logika pre odstránenie termínu
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border-l border-r border-t px-3 py-1 last:border-b">
      <div className=" flex flex-row justify-between">
        <time className="pl-2 text-lg font-semibold">
          {format(new Date(reservation.startTime), "HH:mm", { locale: sk })}
        </time>
        {session?.user.roles.includes("Admin") && (
          <Button
            className="h-7 p-1"
            variant={"destructive"}
            onClick={handleDeleteButtonClick}
          >
            Odstranit termin
          </Button>
        )}
      </div>
      {visibleServiceTypes.map((item) => (
        <div
          key={item.arstdcId}
          className="flex flex-col gap-2 rounded-lg p-2"
          style={{ backgroundColor: `${item.hexColor}20` }}
        >
          <div className="flex flex-row items-center justify-between">
            <span className="font-semibold">{item.serviceTypeName}</span>
            <span className="text-base">Kapacita: {reservation.capacity}</span>
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
            {!session?.user.roles.includes("Admin") && (
              <button
                onClick={tryBookReservation}
                className="text-md rounded-sm border border-secondary bg-white px-[6px]
                 py-[5px] font-semibold text-secondary shadow-lg transition-all ease-in-out hover:bg-secondary hover:text-slate-50"
              >
                Rezervovať
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationCard;
