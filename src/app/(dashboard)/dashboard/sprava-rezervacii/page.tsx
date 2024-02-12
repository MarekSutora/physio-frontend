import CreateNewAvailableReservationForm from "@/components/dashboard/admin/reservations/CreateNewAvailableReservationForm";
import { getServiceTypesAction } from "@/lib/actions/serviceTypeActions";
import {
  TG_BookedReservation,
  TG_PatientForBookedReservation,
  TG_ServiceType,
} from "@/lib/shared/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import React from "react";
import { cn, getErrorMessage } from "@/lib/utils";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";

//TODO aj na mobile nechat pri tych sekciach zaokruhlene okraje, skusit spravit ten wrapper

const getPatientsForBookedReservationAction = async () => {
  "use server";
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/patients/patients-for-booked-reservation`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getBookedReservationsAction = async () => {
  "use server";
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservations/booked-reservations`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const Page = async () => {
  let serviceTypes: TG_ServiceType[] = [];
  try {
    serviceTypes = await getServiceTypesAction();
  } catch (error) {
    console.error(error);
  }

  let patientsForBookedReservation: TG_PatientForBookedReservation[] = [];
  try {
    patientsForBookedReservation =
      await getPatientsForBookedReservationAction();
  } catch (error) {
    console.error(error);
  }

  let bookedReservations: TG_BookedReservation[] = [];
  try {
    bookedReservations = await getBookedReservationsAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvoriť nový termín"}
        width={"w-full lg:w-2/5"}
      >
        <CreateNewAvailableReservationForm
          serviceTypes={serviceTypes}
          patients={patientsForBookedReservation}
        />
      </DashboardSectionWrapper>
      <DashboardSectionWrapper title={"Zarezervované termíny"}>
        <div>
          {bookedReservations.map((item) => (
            <div key={item.cost}>asd</div>
          ))}
        </div>
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
