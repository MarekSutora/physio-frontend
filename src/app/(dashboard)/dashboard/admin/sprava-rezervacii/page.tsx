export const dynamic = "force-dynamic";

import CreateNewAppointmentForm from "@/components/dashboard/admin/appointments/CreateNewAppointmentForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypesActions";
import {
  TG_BookedAppointment,
  TG_PatientForBookedAppointment,
  TG_ServiceType,
} from "@/lib/shared/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import React from "react";
import { cn, getErrorMessage } from "@/lib/utils";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";

//TODO aj na mobile nechat pri tych sekciach zaokruhlene okraje, skusit spravit ten wrapper

async function getBookedAppointmentsAction(): Promise<TG_BookedAppointment[]> {
  "use server";
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }
    
    const url = `${process.env.BACKEND_API_URL}/appointments/booked-appointments`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.text();
      console.error("errorData", errorData);
      throw new Error(errorData);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error("getBookedAppointmentsAction: " + getErrorMessage(error));
  }
}

const Page = async () => {
  let bookedAppointments: TG_BookedAppointment[] = [];
  let serviceTypes: TG_ServiceType[] = [];

  try {
    bookedAppointments = await getBookedAppointmentsAction();
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  const [bookedAppointmentsData, serviceTypesData] = await Promise.all([
    bookedAppointments,
    serviceTypes,
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvoriť nový termín"}
        width={"w-full lg:w-2/5"}
      >
        <CreateNewAppointmentForm serviceTypes={serviceTypesData} />
      </DashboardSectionWrapper>
      <DashboardSectionWrapper title={"Zarezervované termíny"}>
        <div>
          {bookedAppointmentsData.map((item) => (
            <div key={item.cost}>asd</div>
          ))}
        </div>
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
