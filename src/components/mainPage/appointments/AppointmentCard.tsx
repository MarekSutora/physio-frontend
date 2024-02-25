import {
  ServiceTypeOptionType,
  TG_UnbookedAppointment,
} from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClientBookedAppointmentAction } from "@/lib/actions/appointmentsActions";
import { getErrorMessage } from "@/lib/utils";
import AuthButtons from "@/components/auth/authButtons/AuthButtons";
import ReserveAppointmentConfirmationDialog from "./ReserveAppointmentConfirmationDialog";

type AppointmentCardProps = {
  appointment: TG_UnbookedAppointment;
  selectedServiceTypeNames: string[];
};

const AppointmentCard = ({
  appointment,
  selectedServiceTypeNames,
}: AppointmentCardProps) => {
  const { data: session, status: isAuthenticated } = useSession();


  const visibleServiceTypes = appointment.serviceTypeInfos.filter(
    (asti) => selectedServiceTypeNames.includes(asti.name), // Match based on service type name
  );

  //TODO style this

  const handleDeleteButtonClick = () => {
    //TODO
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border-l border-r border-t px-3 py-1 last:border-b">
      <div className=" flex flex-row justify-between">
        <time className="pr-4 text-lg font-semibold">
          {format(new Date(appointment.startTime), "HH:mm", { locale: sk })}
        </time>
        {session?.user.roles.includes("Admin") ? (
          <Button
            className="h-7 p-1"
            variant={"destructive"}
            onClick={handleDeleteButtonClick}
          >
            Zrušiť termín
          </Button>
        ) : (
          !session?.user && (
            <div className="flex flex-row">
              <p className="text-sm text-destructive">
                Pre rezervovanie termínu musíte byť prihlásený
              </p>
              <AuthButtons />
            </div>
          )
        )}
      </div>
      {visibleServiceTypes.map((item) => (
        <div
          key={item.astdcId}
          className="flex flex-col rounded-lg px-2 py-1"
          style={{ backgroundColor: `${item.hexColor}18` }}
        >
          <div className="flex flex-row items-center justify-between pb-1">
            <span className="font-semibold">{item.name}</span>
            {}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm">
              Trvanie:{" "}
              <span className="font-semibold">{item.durationMinutes} min </span>{" "}
              | Cena: <span className="font-semibold">{item.cost + " €"}</span>
              {appointment.capacity > 1 && (
                <>
                  <span> | Obsadenosť: </span>{" "}
                  <span className="font-semibold">
                    {appointment.reservedCount}/{appointment.capacity}
                  </span>
                </>
              )}
            </div>

            {!session?.user.roles.includes("Admin") && session?.user && (
              <ReserveAppointmentConfirmationDialog astdcId={item.astdcId} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentCard;
