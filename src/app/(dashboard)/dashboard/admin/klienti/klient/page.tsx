import ClientPageWrapper from "@/components/dashboard/admin/clients/ClientPageWrapper";
import {
  getBookedAppointmentsForClientAction,
  getFinishedAppointmentsForClientAction,
} from "@/lib/actions/appointmentsActions";
import {
  getAllNotesForPatient,
  getClientById,
} from "@/lib/actions/clientsActions";
import { TClient, TClientNote, TG_BookedAppointment } from "@/lib/shared/types";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  let client: TClient | undefined = undefined;
  let clientsFinishedAppointments: TG_BookedAppointment[] = [];
  let clientsBookedAppointments: TG_BookedAppointment[] = [];
  let clientsNotes: TClientNote[] = [];

  const clientId = props.searchParams.Id;

  let clientIdNumber = -1;
  if (clientId) {
    clientIdNumber = parseInt(clientId as string);
  }

  try {
    client = await getClientById(clientIdNumber);
  } catch (error) {
    console.error(error);
  }

  try {
    clientsFinishedAppointments =
      await getFinishedAppointmentsForClientAction(clientIdNumber);
  } catch (error) {
    console.error(error);
  }

  try {
    clientsBookedAppointments =
      await getBookedAppointmentsForClientAction(clientIdNumber);
  } catch (error) {
    console.error(error);
  }

  try {
    clientsNotes = await getAllNotesForPatient(clientIdNumber);
  } catch (error) {
    console.error(error);
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
