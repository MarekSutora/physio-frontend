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
import { locale, addLocale } from "primereact/api";
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

declare module "primereact/api" {
  export function addLocale(
    locale: string,
    localeSettings: Record<string, any>,
  ): void;
}

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

const BookedAppointmentsGrid = ({ bookedAppointments }: Props) => {
  const [dynamicStyles, setDynamicStyles] = useState("");
  const { toast } = useToast();
  const [bookedAppointmentsState, setBookedAppointmentsState] =
    useState<TG_BookedAppointment[]>(bookedAppointments);
  const { data: session } = useSession();

  locale("sk");
  addLocale("sk", {
    startsWith: "Začína na",
    contains: "Obsahuje",
    notContains: "Neobsahuje",
    endsWith: "Končí na",
    equals: "Rovná sa",
    notEquals: "Nerovná sa",
    noFilter: "Bez filtra",
    filter: "Filter",
    lt: "Menšie než",
    lte: "Menšie než alebo rovné",
    gt: "Väčšie než",
    gte: "Väčšie než alebo rovné",
    dateIs: "Dátum je",
    dateIsNot: "Dátum nie je",
    dateBefore: "Dátum je pred",
    dateAfter: "Dátum je po",
    custom: "Vlastné",
    clear: "Vyčistiť",
    apply: "Použiť",
    matchAll: "Zodpovedá všetkým",
    matchAny: "Zodpovedá akémukoľvek",
    addRule: "Pridať pravidlo",
    removeRule: "Odstrániť pravidlo",
    accept: "Áno",
    reject: "Nie",
    choose: "Vybrať",
    upload: "Nahrať súbor",
    cancel: "Zrušiť",
    completed: "Dokončené",
    pending: "Čakajúce",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: [
      "Nedeľa",
      "Pondelok",
      "Utorok",
      "Streda",
      "Štvrtok",
      "Piatok",
      "Sobota",
    ],
    dayNamesShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob"],
    dayNamesMin: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
    monthNames: [
      "Január",
      "Február",
      "Marec",
      "Apríl",
      "Máj",
      "Jún",
      "Júl",
      "August",
      "September",
      "Október",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Máj",
      "Jún",
      "Júl",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ],
    chooseYear: "Vyberte rok",
    chooseMonth: "Vyberte mesiac",
    chooseDate: "Vyberte dátum",
    prevDecade: "Predchádzajúce desaťročie",
    nextDecade: "Nasledujúce desaťročie",
    prevYear: "Predchádzajúci rok",
    nextYear: "Nasledujúci rok",
    prevMonth: "Predchádzajúci mesiac",
    nextMonth: "Nasledujúci mesiac",
    prevHour: "Predchádzajúca hodina",
    nextHour: "Nasledujúca hodina",
    prevMinute: "Predchádzajúca minúta",
    nextMinute: "Nasledujúca minúta",
    prevSecond: "Predchádzajúca sekunda",
    nextSecond: "Nasledujúca sekunda",
    am: "ráno",
    pm: "popoludní",
    today: "Dnes",
    now: "Teraz",
    weekHeader: "Týž.",
    firstDayOfWeek: 1,
    showMonthAfterYear: false,
    dateFormat: "dd.mm.rrrr",
    weak: "Slabé",
    medium: "Stredné",
    strong: "Silné",
    passwordPrompt: "Zadejte heslo",
    emptyFilterMessage: "Neboli nájdené žiadne výsledky",
    searchMessage: "Je k dispozícií {0} výsledkov",
    selectionMessage: "Vybraných {0} položiek",
    emptySelectionMessage: "Žiadna vybraná položka",
    emptySearchMessage: "Neboli nájdené žiadne výsledky",
    emptyMessage: "Žiadne dostupné možnosti",
    aria: {
      trueLabel: "Pravda",
      falseLabel: "Nepravda",
      nullLabel: "Nevybrané",
      star: "1 hviezda",
      stars: "{star} hviezd",
      selectAll: "Všetky položky vybrané",
      unselectAll: "Všetky položky zrušené",
      close: "Zavrieť",
      previous: "Predchádzajúci",
      next: "Ďalší",
      navigation: "Navigácia",
      scrollTop: "Posunúť hore",
      moveTop: "Presunúť hore",
      moveUp: "Presunúť hore",
      moveDown: "Presunúť dole",
      moveBottom: "Presunúť dole",
      moveToTarget: "Presunúť na cieľ",
      moveToSource: "Presunúť ku zdroju",
      moveAllToTarget: "Presunúť všetko na cieľ",
      moveAllToSource: "Presunúť všetko ku zdroju",
      pageLabel: "{page}",
      firstPageLabel: "Prvá strana",
      lastPageLabel: "Posledná strana",
      nextPageLabel: "Dalšia strana",
      previousPageLabel: "Predchádzajúca strana",
      rowsPerPageLabel: "Riadkov na stranu",
      jumpToPageDropdownLabel: "Prejsť na stránku Dropdown",
      jumpToPageInputLabel: "Prejsť na stránku Input",
      selectRow: "Vybrať riadok",
      unselectRow: "Zrušiť výber riadku",
      expandRow: "Rozbaliť riadok",
      collapseRow: "Zbaliť riadok",
      showFilterMenu: "Zobraziť filter menu",
      hideFilterMenu: "Skryť filter menu",
      filterOperator: "Operátor filtra",
      filterConstraint: "Obmedzenie filtra",
      editRow: "Upraviť riadok",
      saveEdit: "Uložiť úpravu",
      cancelEdit: "Zrušiť úpravu",
      listView: "Zobrazenie zoznamu",
      gridView: "Zobrazenie mriežky",
      slide: "Snímka",
      slideNumber: "{slideNumber}",
      zoomImage: "Priblížiť obrázok",
      zoomIn: "Priblížiť",
      zoomOut: "Oddialiť",
      rotateRight: "Otočiť doprava",
      rotateLeft: "Otočiť doľava",
    },
  });

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

  const rowClassName = (data: TG_BookedAppointment) => {
    return `row-bg-${data.hexColor.replace("#", "")}`;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

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

export default BookedAppointmentsGrid;
