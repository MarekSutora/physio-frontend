"use client";

import { TClient, TClientNote, TG_BookedAppointment } from "@/lib/shared/types";
import React, { useEffect, useState } from "react";
import DashboardSectionWrapper from "../../common/DashboardSectionWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import ClientNotesGridForm from "../../common/ClientNotesDataTableForm";
import FinishedAppointmentsGrid from "../../common/FinishedAppointmentsDataTable";
import BookedAppointmentsGrid from "../../common/BookedAppointmentsDataTable";
import { useRouter } from "next/navigation";

type Props = {
  clientData: TClient | undefined;
  clientNotes: TClientNote[];
  clientBookedAppointments: TG_BookedAppointment[];
  clientFinishedAppointments: TG_BookedAppointment[];
};

const ClientPageWrapper = ({
  clientData,
  clientNotes,
  clientBookedAppointments,
  clientFinishedAppointments,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const [sectionToggled, setSectionToggled] = useState<string>(
    "bookedAppointmentsSection",
  );

  return (
    <div className="flex h-full w-full flex-col gap-2 xl:flex-row">
      <DashboardSectionWrapper
        title="Informácie o klientovi"
        height="h-fit xl:h-full"
        width="w-full xl:w-1/4"
      >
        {clientData && (
          <div className="mx-5 mt-6 flex flex-row flex-wrap lg:mx-0 xl:flex-col">
            <h2>
              <span>Id: </span>{" "}
              <span className="font-semibold">{clientData.personId}</span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300 xl:mx-0 xl:my-2 xl:h-[1px] xl:w-1/2"></div>
            <h2>
              <span>Meno: </span>{" "}
              <span className="font-semibold">
                {clientData.firstName} {clientData.lastName}
              </span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300 xl:mx-0 xl:my-2 xl:h-[1px] xl:w-1/2"></div>
            <h2>
              <span>Email: </span>{" "}
              <span className="font-semibold">{clientData.email}</span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300 xl:mx-0 xl:my-2 xl:h-[1px] xl:w-1/2"></div>
            <h2>
              <span>Telefónne číslo: </span>{" "}
              <span className="font-semibold">
                {clientData.phoneNumber
                  ? clientData.phoneNumber
                  : "+421900123456"}
              </span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300 xl:mx-0 xl:my-2 xl:h-[1px] xl:w-1/2"></div>
            <h2>
              <span>Dátum registrácie: </span>
              <span className="font-semibold">
                {new Date(clientData.registeredDate).toLocaleDateString("sk")}
              </span>
            </h2>
          </div>
        )}
      </DashboardSectionWrapper>

      <div className="flex w-full flex-col gap-2 xl:w-3/4">
        <DashboardSectionWrapper height="h-fit" width="w-full">
          <div className="flex flex-row flex-wrap gap-2">
            <Button
              className={cn(
                sectionToggled === "bookedAppointmentsSection"
                  ? "border-gray-600 bg-white text-gray-700 transition-all duration-100 ease-in-out hover:border-gray-700 hover:bg-gray-100 hover:text-gray-800"
                  : "border-gray-900 bg-gray-900 text-white transition-all duration-100 ease-in-out hover:border-gray-600 hover:bg-white hover:text-gray-600",
                "rounded-lg border-2 px-2 py-1 text-sm font-semibold",
              )}
              onClick={() => setSectionToggled("bookedAppointmentsSection")}
            >
              Zarezervované termíny
            </Button>
            <Button
              className={cn(
                sectionToggled === "finishedAppointmentsSection"
                  ? "border-gray-600 bg-white text-gray-700 transition-all duration-100 ease-in-out hover:border-gray-700 hover:bg-gray-100 hover:text-gray-800"
                  : "border-gray-900 bg-gray-900 text-white transition-all duration-100 ease-in-out hover:border-gray-600 hover:bg-white hover:text-gray-600",
                "rounded-lg border-2 px-2 py-1 text-sm font-semibold",
              )}
              onClick={() => setSectionToggled("finishedAppointmentsSection")}
            >
              Ukončené termíny
            </Button>
            <Button
              className={cn(
                sectionToggled === "clientNotesSection"
                  ? "border-gray-600 bg-white text-gray-700 transition-all duration-100 ease-in-out hover:border-gray-700 hover:bg-gray-100 hover:text-gray-800"
                  : "border-gray-900 bg-gray-900 text-white transition-all duration-100 ease-in-out hover:border-gray-600 hover:bg-white hover:text-gray-600",
                "rounded-lg border-2 px-2 py-1 text-sm font-semibold",
              )}
              onClick={() => setSectionToggled("clientNotesSection")}
            >
              Poznámky ku klientovi
            </Button>
          </div>
        </DashboardSectionWrapper>
        {sectionToggled === "bookedAppointmentsSection" && (
          <BookedAppointmentsGrid
            bookedAppointments={clientBookedAppointments}
          />
        )}
        {sectionToggled === "finishedAppointmentsSection" && (
          <FinishedAppointmentsGrid
            finishedAppointments={clientFinishedAppointments}
          />
        )}
        {sectionToggled === "clientNotesSection" && clientData && (
          <ClientNotesGridForm
            clientNotes={clientNotes}
            personId={clientData?.personId}
          />
        )}
      </div>
    </div>
  );
};

export default ClientPageWrapper;
