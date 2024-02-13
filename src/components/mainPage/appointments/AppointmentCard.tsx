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

type AppointmentCardProps = {
  appointment: TG_UnbookedAppointment;
  selectedServiceTypeNames: string[];
};

const AppointmentCard = ({
  appointment,
  selectedServiceTypeNames,
}: AppointmentCardProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const visibleServiceTypes = appointment.serviceTypeInfos.filter(
    (asti) => selectedServiceTypeNames.includes(asti.name), // Match based on service type name
  );

  console.log("appointment", appointment);

  //TODO style this

  const tryBookAppointment = async (astdcId: number) => {
    if (session?.user && session.user.roles.includes("Patient")) {
      try {
        await createClientBookedAppointmentAction(astdcId);

        toast({
          variant: "success",
          title: "Appointment created successfully!",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: getErrorMessage(error),
        });
      }
    } else {
      alert("You must be logged in as a patient to book a Appointment.");
    }
  };
  const handleDeleteButtonClick = () => {
    // Logika pre odstránenie termínu
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border-l border-r border-t px-3 py-1 last:border-b">
      <div className=" flex flex-row justify-between">
        <time className="pl-2 text-lg font-semibold">
          {format(new Date(appointment.startTime), "HH:mm", { locale: sk })}
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
          key={item.astdcId}
          className="flex flex-col gap-2 rounded-lg p-2"
          style={{ backgroundColor: `${item.hexColor}20` }}
        >
          <div className="flex flex-row items-center justify-between">
            <span className="font-semibold">{item.name}</span>
            <span className="text-base">Kapacita: {appointment.capacity}</span>
          </div>
          <div className="text-sm">
            Trvanie: {item.durationMinutes} min | Cena: {item.cost} €
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm">
              Voľné miesta:{" "}
              <span className="font-semibold">
                {appointment.capacity - appointment.reservedCount}
              </span>
            </div>
            {!session?.user.roles.includes("Admin") && (
              <button
                onClick={() => tryBookAppointment(item.astdcId)}
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

export default AppointmentCard;
