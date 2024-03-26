"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { TG_BookedAppointment } from "@/lib/shared/types";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import DashboardSectionWrapper from "./DashboardSectionWrapper";
import { FilterMatchMode } from "primereact/api";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

import { Button } from "@/components/ui/button";
import ShadConfirmationDialog from "@/components/mainPage/common/logo/ShadConfirmationDialog";
import {
  deleteAppointmentAction,
  deleteBookedAppointmentAction,
  markBookedAppointmentAsFinishedAction,
} from "@/lib/actions/appointmentsActions";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  formatDate,
  rowClassName,
  setUpLocaleForDataTable,
} from "@/lib/utils/dataTableUtils";
import { FaFileExcel } from "react-icons/fa";
import Papa from "papaparse";

type Props = {
  bookedAppointments: TG_BookedAppointment[];
};

//TODO date filtering
//TODO mozno clear filter global a keyword search global
//TODO warning server does not match client

const defaultFilters: DataTableFilterMeta = {
  serviceTypeName: { value: null, matchMode: FilterMatchMode.IN },
  durationMinutes: { value: null, matchMode: FilterMatchMode.EQUALS },
  cost: { value: null, matchMode: FilterMatchMode.EQUALS },
  clientFirstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  clientSecondName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS },
  startTime: { value: null, matchMode: FilterMatchMode.CONTAINS },
  appointmentBookedDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  clientId: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const BookedAppointmentsDataTable = ({ bookedAppointments }: Props) => {
  const [dynamicStyles, setDynamicStyles] = useState("");
  const { toast } = useToast();
  const [bookedAppointmentsState, setBookedAppointmentsState] =
    useState<TG_BookedAppointment[]>(bookedAppointments);
  const { data: session } = useSession();

  setUpLocaleForDataTable();

  const bookedAppointmentsToSlovakMapping: { [key: string]: string } = {
    serviceTypeName: "Typ služby",
    durationMinutes: "Trvanie",
    cost: "Cena",
    clientFirstName: "Meno",
    clientSecondName: "Priezvisko",
    capacity: "Kapacita",
    startTime: "Začiatok",
    appointmentBookedDate: "Dátum rezervácie",
    clientId: "ID klienta",
  };

  const exportCSV = () => {
    const csv = Papa.unparse({
      fields: Object.keys(bookedAppointmentsToSlovakMapping),
      data: bookedAppointmentsState.map((appt) => ({
        serviceTypeName: appt.serviceTypeName,
        durationMinutes: appt.durationMinutes,
        cost: appt.cost,
        clientFirstName: appt.clientFirstName,
        clientSecondName: appt.clientSecondName,
        capacity: appt.capacity,
        startTime: formatDate(appt.startTime),
        appointmentBookedDate: formatDate(appt.appointmentBookedDate),
        clientId: appt.clientId,
      })),
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "rezervovane-terminy.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let styles = "";
    bookedAppointments.forEach((appointment) => {
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
  }, [bookedAppointments]);

  const serviceTypeFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    return (
      <MultiSelect
        value={options.value}
        options={Array.from(
          new Set(bookedAppointments.map((appt) => appt.serviceTypeName)),
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

  const handleDeleteBookedAppointment = async (id: number) => {
    try {
      await deleteBookedAppointmentAction(id);

      toast({
        variant: "success",
        title: "Rezervácia úspešne zrušená.",
        className: "text-lg",
      });
      setBookedAppointmentsState(
        bookedAppointments.filter((appt) => appt.id !== id),
      );
    } catch {
      toast({
        variant: "destructive",
        title: "Chyba pri rušení rezervácie.",
        className: "text-lg",
      });
    }
  };

  const handleDeleteAppointment = async (appId: number) => {
    try {
      await deleteAppointmentAction(appId);

      toast({
        variant: "success",
        title: "Termín úspešne zrušený.",
        className: "text-lg",
      });
      setBookedAppointmentsState(
        bookedAppointments.filter((appt) => appt.appointmentId !== appId),
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba pri rušení termínu.",
        className: "text-lg",
      });
    }
  };

  const handleMarkBkedAppAsFinished = async (id: number) => {
    try {
      await markBookedAppointmentAsFinishedAction(id);

      toast({
        variant: "success",
        title: "Termín úspešne označený ako vykonaný.",
        className: "text-lg",
      });
      setBookedAppointmentsState(
        bookedAppointments.filter((appt) => appt.id !== id),
      );
    } catch {
      toast({
        variant: "destructive",
        title: "Chyba pri označovaní termínu ako vykonaný.",
        className: "text-lg",
      });
    }
  };

  const actionBodyTemplate = (rowData: TG_BookedAppointment) => {
    return (
      <div className="flex flex-row items-center gap-1">
        <Link
          href={`../../termin?appId=${rowData.appointmentId}`}
          className="flex h-8 flex-row items-center rounded-sm bg-primary px-2 text-center text-sm font-medium text-white hover:bg-primary/85"
        >
          Otvoriť
        </Link>
        {session?.user?.roles.includes("Admin") && (
          <div className="flex flex-row items-center gap-1">
            <ShadConfirmationDialog
              onConfirm={handleDeleteBookedAppointment}
              confirmArgs={[rowData.id]}
            >
              <Button className="h-8 px-2 py-1" variant="destructive">
                Zrušiť rezerváciu
              </Button>
            </ShadConfirmationDialog>
            <ShadConfirmationDialog
              onConfirm={handleDeleteAppointment}
              confirmArgs={[rowData.appointmentId]}
            >
              <Button className="h-8 px-2 py-1" variant="destructive">
                Zrušiť termín
              </Button>
            </ShadConfirmationDialog>
            <ShadConfirmationDialog
              onConfirm={handleMarkBkedAppAsFinished}
              confirmArgs={[rowData.id]}
            >
              <Button className="h-8 px-2 py-1" variant="default">
                Vykonané
              </Button>
            </ShadConfirmationDialog>
          </div>
        )}
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
      title="Rezervované termíny"
      height="max-h-full h-full"
    >
      <style>{dynamicStyles}</style>
      <DataTable
        value={bookedAppointmentsState}
        paginator
        rows={13}
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
            field="clientId"
            header="ID klienta"
            sortable
            body={(rowData: TG_BookedAppointment) => rowData.clientId}
            filter
            filterField="clientId"
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

export default BookedAppointmentsDataTable;
