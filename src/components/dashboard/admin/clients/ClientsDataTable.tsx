"use client";

import { TClient } from "@/lib/shared/types";
import React, { useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import DashboardSectionWrapper from "../../common/DashboardSectionWrapper";
import { FilterMatchMode } from "primereact/api";
import Link from "next/link";
import {
  formatDate,
  setUpLocaleForDataTable,
} from "@/lib/utils/dataTableUtils";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

type Props = {
  clients: TClient[];
};

const defaultFilters: DataTableFilterMeta = {
  personId: { value: null, matchMode: FilterMatchMode.CONTAINS },
  firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
  registrationDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const ClientsDataTable = ({ clients }: Props) => {
  const [clientsDataState, setClientsDataState] = useState<TClient[]>(clients); //TODO do buducnosti pre mazanie klientov

  setUpLocaleForDataTable();

  const clientAttributeToSlovakMapping: { [key: string]: string } = {
    personId: "Id",
    firstName: "Meno",
    lastName: "Priezvisko",
    email: "Email",
    phoneNumber: "Telefón",
    registrationDate: "Dátum registrácie",
  };

  const exportCSV = () => {
    const csv = Papa.unparse({
      fields: Object.keys(clientAttributeToSlovakMapping),
      data: clientsDataState.map((client) => ({
        personId: client.personId,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        registrationDate: formatDate(client.registeredDate),
      })),
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "clients.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionBodyTemplate = (rowData: TClient) => {
    return (
      <div className="flex flex-row gap-1">
        <Link
          href={`./klienti/klient?Id=${rowData.personId}`}
          className="flex h-8 flex-row items-center rounded-sm bg-primary px-2 text-center text-sm font-medium text-white hover:bg-primary/85"
        >
          Otvoriť
        </Link>
      </div>
    );
  };

  const header = (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={exportCSV} className="h-8 px-2 py-1" variant="default">
        Exportovať do CSV <FaFileExcel />
      </Button>
    </div>
  );

  return (
    <DashboardSectionWrapper title="Klienti">
      <DataTable
        value={clientsDataState}
        paginator
        rows={11}
        emptyMessage="Nenašli sa žiadní klienti."
        filterLocale="sk"
        filters={defaultFilters}
        aria-hidden
        dataKey="id"
        size="small"
        header={header}
      >
        <Column
          field="personId"
          header="Id"
          filter
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          field="firstName"
          header="Meno"
          filter
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          field="lastName"
          header="Priezvisko"
          filter
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          field="email"
          header="Email"
          filter
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          field="phoneNumber"
          header="Telefón"
          filter
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          field="registrationDate"
          header="Dátum registrácie"
          body={(rowData: TClient) => formatDate(rowData.registeredDate)}
          style={{ width: "260px" }}
          filter
          filterMatchMode={FilterMatchMode.CONTAINS}
        />
        <Column
          header="Akcie"
          body={actionBodyTemplate}
          style={{ width: "330px" }}
        />
      </DataTable>
    </DashboardSectionWrapper>
  );
};

export default ClientsDataTable;
