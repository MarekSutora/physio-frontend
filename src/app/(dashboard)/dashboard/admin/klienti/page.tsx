export const dynamic = "force-dynamic";

import ClientsGrid from "@/components/dashboard/admin/clients/ClientsDataTable";
import { getClientsData } from "@/lib/actions/clientsActions";
import { TClient } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let clients: TClient[] = [];

  try {
    clients = await getClientsData();
  } catch (error) {
    console.log("error", error);
  }

  return <ClientsGrid clients={clients} />;
};

export default Page;
