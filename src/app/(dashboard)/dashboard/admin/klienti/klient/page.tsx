import ClientPageWrapper from "@/components/dashboard/admin/clients/ClientPageWrapper";
import {
  getBookedAppointmentsForClientAction,
  getFinishedAppointmentsForClientAction,
} from "@/lib/actions/appointmentsActions";
import {
  getAllNotesForClient,
  getClientById,
} from "@/lib/actions/clientsActions";
import { TClient, TClientNote, TG_BookedAppointment } from "@/lib/shared/types";
import { getErrorMessage } from "@/lib/utils/utils";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  let client: TClient | undefined = undefined;
  let clientsFinishedAppointments: TG_BookedAppointment[] = [];
  let clientsBookedAppointments: TG_BookedAppointment[] = [];
  let clientsNotes: TClientNote[] = [];

  const personId = props.searchParams.Id;

  let personIdNumber = -1;
  if (personId) {
    personIdNumber = parseInt(personId as string);
  }

  try {
    client = await getClientById(personIdNumber);
  } catch (error) {
    console.error(getErrorMessage(error));
  }

  try {
    clientsFinishedAppointments =
      await getFinishedAppointmentsForClientAction(personIdNumber);
  } catch (error) {
    console.error(getErrorMessage(error));
  }

  try {
    clientsBookedAppointments =
      await getBookedAppointmentsForClientAction(personIdNumber);
  } catch (error) {
    console.error(getErrorMessage(error));
  }

  try {
    clientsNotes = await getAllNotesForClient(personIdNumber);
  } catch (error) {
    console.error(getErrorMessage(error));
  }

  return (
    <ClientPageWrapper
      clientData={client}
      clientNotes={clientsNotes}
      clientBookedAppointments={clientsBookedAppointments}
      clientFinishedAppointments={clientsFinishedAppointments}
    />
  );
};

export default Page;
