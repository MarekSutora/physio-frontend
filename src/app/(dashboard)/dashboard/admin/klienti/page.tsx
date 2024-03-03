import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import ClientsGrid from "@/components/dashboard/admin/clients/clientsGrid";
import { getPatientsData } from "@/lib/actions/patientsAction";
import { TClient } from "@/lib/shared/types";
import { getErrorMessage } from "@/lib/utils";
import { ca } from "date-fns/locale";
import React from "react";

const Page = async () => {
  let clients: TClient[] = [];

  try {
    clients = await getPatientsData();
  } catch (error) {
    console.error("error", error);
  }

  return <ClientsGrid clients={clients} />;
};

export default Page;
