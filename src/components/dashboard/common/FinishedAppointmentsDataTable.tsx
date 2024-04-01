"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { TG_BookedAppointment } from "@/lib/shared/types";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import Link from "next/link";
import DashboardSectionWrapper from "./DashboardSectionWrapper";
import { useSession } from "next-auth/react";
import {
  formatDate,
  rowClassName,
  setUpLocaleForDataTable,
} from "@/lib/utils/dataTableUtils";
import Papa from "papaparse";
import { FaFileExcel } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type Props = {
  finishedAppointments: TG_BookedAppointment[];
};

const defaultFilters: DataTableFilterMeta = {
  serviceTypeName: { value: null, matchMode: FilterMatchMode.IN },
  durationMinutes: { value: null, matchMode: FilterMatchMode.EQUALS },
  cost: { value: null, matchMode: FilterMatchMode.EQUALS },
  clientFirstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  clientSecondName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
  startTime: { value: null, matchMode: FilterMatchMode.CONTAINS },
  appointmentBookedDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  personId: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const AdminFinishedAppointmentsDataTable = ({
  finishedAppointments,
}: Props) => {
  const [dynamicStyles, setDynamicStyles] = useState("");
  const { data: session } = useSession();

  setUpLocaleForDataTable();

  const finishedAppointmentsToSlovakMapping: { [key: string]: string } = {
    serviceTypeName: "Typ služby",
    durationMinutes: "Trvanie",
    cost: "Cena",
    clientFirstName: "Meno",
    clientSecondName: "Priezvisko",
    capacity: "Kapacita",
    startTime: "Začiatok",
    appointmentBookedDate: "Dátum zarezervovania",
    personId: "ID klienta",
  };

  const exportCSV = () => {
    const csv = Papa.unparse({
      fields: Object.keys(finishedAppointmentsToSlovakMapping),
      data: finishedAppointments.map((appointment) => ({
        serviceTypeName: appointment.serviceTypeName,
        durationMinutes: appointment.durationMinutes,
        cost: appointment.cost,
        clientFirstName: appointment.clientFirstName,
        clientSecondName: appointment.clientSecondName,
        capacity: appointment.capacity,
        startTime: formatDate(appointment.startTime),
        appointmentBookedDate: formatDate(appointment.appointmentBookedDate),
        personId: appointment.personId,
      })),
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "finishedAppointments.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let styles = "";
    finishedAppointments.forEach((appointment) => {
      const colorClass = `row-bg-${appointment.hexColor.replace("#", "")}`;
      styles += `
        .${colorClass} {
          background-color: ${appointment.hexColor}14;
        }
        .${colorClass}:hover {
          background-color: ${appointment.hexColor}28;
        }
      `;
    });
    setDynamicStyles(styles);
  }, [finishedAppointments]);

  const serviceTypeFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    return (
      <MultiSelect
        value={options.value}
        options={Array.from(
          new Set(finishedAppointments.map((appt) => appt.serviceTypeName)),
        )}
        onChange={(e: MultiSelectChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        optionLabel="typ"
        placeholder="Vyber typ"
        className="p-column-filter"
        itemTemplate={(option) => {
          return <span>{option}</span>;
        }}
      />
    );
  };

  const actionBodyTemplate = (rowData: TG_BookedAppointment) => {
    return (
      <div className="flex flex-row gap-1">
        <Link
          href={`../termin?appId=${rowData.appointmentId}`}
          className="flex h-8 flex-row items-center rounded-sm bg-primary px-2 text-center text-sm font-medium text-white hover:bg-primary/85"
        >
          Otvoriť
        </Link>
      </div>
    );
  };

  const header = session?.user?.roles.includes("Admin") && (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={exportCSV} className="h-8 px-2 py-1" variant="default">
        Exportovať do CSV <FaFileExcel />
      </Button>
    </div>
  );

  return (
    <DashboardSectionWrapper
      title="História termínov"
      height="max-h-full h-full"
    >
      <style>{dynamicStyles}</style>
      <DataTable
        value={finishedAppointments}
        paginator
        rows={11}
        emptyMessage="Nenašli sa žiadne výsledky"
        rowClassName={rowClassName}
        filters={defaultFilters}
        filterLocale="sk"
        aria-hidden
        dataKey="id"
        size="small"
        groupRowsBy="appointmentId"
        rowGroupMode="rowspan"
        header={header}
      >
        <Column
          field="startTime"
          header="Začiatok"
          sortable
          body={(rowData: TG_BookedAppointment) =>
            formatDate(rowData.startTime)
          }
          style={{ width: "200px", minWidth: "200px" }}
          filter
          filterField="startTime"
        />
        <Column
          field="serviceTypeName"
          header="Typ služby"
          sortable
          body={(rowData: TG_BookedAppointment) => rowData.serviceTypeName}
          style={{ width: "200px" }}
          filter
          filterElement={serviceTypeFilterTemplate}
          showFilterMatchModes={false}
        />
        <Column
          field="durationMinutes"
          header="Trvanie"
          sortable
          body={(rowData: TG_BookedAppointment) =>
            `${rowData.durationMinutes} min`
          }
          style={{ width: "70px" }}
          filter
          filterField="durationMinutes"
        />
        <Column
          field="appointmentBookedDate"
          header="Dátum zarezervovania"
          sortable
          body={(rowData: TG_BookedAppointment) =>
            formatDate(rowData.appointmentBookedDate)
          }
          filter
          filterField="appointmentBookedDate"
        />
        {session?.user?.roles.includes("Admin") && (
          <Column
            field="cost"
            header="Cena"
            sortable
            body={(rowData: TG_BookedAppointment) => `${rowData.cost} €`}
            filter
            filterField="cost"
            hidden
          />
        )}
        {session?.user?.roles.includes("Admin") && (
          <Column
            field="personId"
            header="ID klienta"
            sortable
            body={(rowData: TG_BookedAppointment) => rowData.personId}
            filter
            filterField="personId"
          />
        )}
        {session?.user?.roles.includes("Admin") && (
          <Column
            field="clientFirstName"
            header="Meno"
            sortable
            body={(rowData: TG_BookedAppointment) => rowData.clientFirstName}
            filter
            filterField="clientFirstName"
          />
        )}
        {session?.user?.roles.includes("Admin") && (
          <Column
            field="clientSecondName"
            header="Priezvisko"
            sortable
            body={(rowData: TG_BookedAppointment) => rowData.clientSecondName}
            filter
            filterField="clientSecondName"
          />
        )}
        {session?.user?.roles.includes("Admin") && (
          <Column
            field="capacity"
            header="Kapacita"
            sortable
            body={(rowData: TG_BookedAppointment) => rowData.capacity}
            filter
            filterField="capacity"
            hidden
          />
        )}
        <Column
          header="Akcie"
          body={actionBodyTemplate}
          style={{ width: "330px" }}
        />
      </DataTable>
    </DashboardSectionWrapper>
  );
};

export default AdminFinishedAppointmentsDataTable;
