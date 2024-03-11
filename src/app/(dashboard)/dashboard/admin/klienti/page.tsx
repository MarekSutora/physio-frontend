export const dynamic = "force-dynamic";

import ClientsGrid from "@/components/dashboard/admin/clients/ClientsGrid";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import { getClientsData } from "@/lib/actions/clientsActions";
import { TClient } from "@/lib/shared/types";
import { getErrorMessage } from "@/lib/utils";
import { ca } from "date-fns/locale";
import React from "react";

const Page = async () => {
  let clients: TClient[] = [];

  try {
    clients = await getClientsData();
  } catch (error) {
    console.error("error", error);
  }

  return <ClientsGrid clients={clients} />;
};

export default Page;
