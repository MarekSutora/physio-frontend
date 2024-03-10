"use client";

import { TClient, TClientNote, TG_BookedAppointment } from "@/lib/shared/types";
import React, { useState } from "react";
import DashboardSectionWrapper from "../../common/DashboardSectionWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ClientNotesGridForm from "../../common/ClientNotesGridForm";
import FinishedAppointmentsGrid from "../../common/FinishedAppointmentsGrid";
import BookedAppointmentsGrid from "../../common/BookedAppointmentsGrid";

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
  const [sectionToggled, setSectionToggled] = useState<string>(
    "bookedAppointmentsSection",
  );

  return (
    <div className="flex h-full w-full flex-col gap-2 md:flex-row">
      <DashboardSectionWrapper
        title="Client Information"
        height="h-full"
        width="w-full md:w-1/4"
      >
        {clientData && (
          <div>
            <h2>
              {clientData.firstName} {clientData.lastName}
            </h2>
            <p>{clientData.email}</p>
            <p>{clientData.phoneNumber}</p>
          </div>
        )}
      </DashboardSectionWrapper>

      <div className="flex w-full flex-col gap-2 md:w-3/4">
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
              Zarezervovane terminy
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
              Ukoncene terminy
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
              Poznamky ku klientovi
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
            clientId={clientData?.personId}
          />
        )}
      </div>
    </div>
  );
};

export default ClientPageWrapper;
