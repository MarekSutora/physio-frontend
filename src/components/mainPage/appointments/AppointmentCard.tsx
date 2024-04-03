import { TG_UnbookedAppointment } from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthButtons from "@/components/auth/authButtons/AuthButtons";
import ShadConfirmationDialog from "../common/ShadConfirmationDialog";
import {
  createBookedAppointmentAction,
  deleteAppointmentAction,
} from "@/lib/actions/appointmentsActions";
import { useAppointmentsStore } from "@/lib/stores/useAppointmentsStore";

type AppointmentCardProps = {
  appointment: TG_UnbookedAppointment;
  selectedServiceTypeNames: string[];
};

const AppointmentCard = ({
  appointment,
  selectedServiceTypeNames,
}: AppointmentCardProps) => {
  const { data: session, status: isAuthenticated } = useSession();
  const { toast } = useToast();

  const visibleServiceTypes = appointment.serviceTypeInfos.filter((asti) =>
    selectedServiceTypeNames.includes(asti.name),
  );

  const removeAppointmentByAppId = useAppointmentsStore(
    (state) => state.removeAppointmentByAppId,
  );

  const handleDeleteAppointment = async (appId: number) => {
    try {
      await deleteAppointmentAction(appId);

      toast({
        variant: "success",
        title: "Termín úspešne zrušený.",
        className: "text-lg",
      });
      removeAppointmentByAppId(appId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba pri rušení termínu.",
        className: "text-lg",
      });
    }
  };

  const bookAppointment = async (astdcId: number) => {
    if (isAuthenticated && session?.user.roles.includes("Client")) {
      try {
        await createBookedAppointmentAction(astdcId);
        removeAppointmentByAppId(astdcId);
        toast({
          variant: "success",
          title: "Termín úspešne zarezervovaný.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Chyba pri rezervovaní termínu.",
        });
      }
    } else {
      alert("Musíte byť prihlásený.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border-l border-r border-t px-3 py-1 last:border-b">
      <div className=" flex flex-row justify-between">
        <time className="pr-5 pt-1 text-lg font-semibold">
          {format(new Date(appointment.startTime), "HH:mm", { locale: sk })}
        </time>
        {session?.user.roles.includes("Admin") ? (
          <ShadConfirmationDialog
            onConfirm={handleDeleteAppointment}
            confirmArgs={[appointment.id]}
          >
            <Button className="h-8 px-2 py-1" variant="destructive">
              Zrušiť termín
            </Button>
          </ShadConfirmationDialog>
        ) : (
          !session?.user && (
            <div className="flex flex-row items-center justify-center">
              <p className="w-full pr-3 text-sm font-medium text-destructive">
                Na rezervovanie termínu musíte byť prihlásený
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

            {session?.user.roles.includes("Client") && session?.user && (
              <ShadConfirmationDialog
                onConfirm={bookAppointment}
                confirmArgs={[item.astdcId]}
              >
                <button
                  className="text-md flex h-8 items-center rounded-sm border border-primary/85 bg-white px-[6px]
                 py-[5px] font-semibold text-primary/85 shadow-md transition-all ease-in-out hover:bg-primary/85 hover:text-slate-50"
                >
                  Rezervovať
                </button>
              </ShadConfirmationDialog>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentCard;
