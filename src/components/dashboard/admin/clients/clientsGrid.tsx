"use client";

import { TClient } from "@/lib/shared/types";
import React, { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { TG_BookedAppointment } from "@/lib/shared/types";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import DashboardSectionWrapper from "../../DashboardSectionWrapper";
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

declare module "primereact/api" {
  export function addLocale(
    locale: string,
    localeSettings: Record<string, any>,
  ): void;
}

type Props = {
  clients: TClient[];
};

const defaultFilters: DataTableFilterMeta = {
  ID: { value: null, matchMode: FilterMatchMode.CONTAINS },
  firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
  registrationDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const ClientsGrid = ({ clients }: Props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dynamicStyles, setDynamicStyles] = useState("");
  const { toast } = useToast();
  const [clientsDataState, setclientsDataState] = useState<TClient[]>(clients);

  console.log("clientsDataState", clientsDataState);

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

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    console.log("dateString", dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const actionBodyTemplate = (rowData: TClient) => {
    return (
      <div className="flex flex-row gap-1">
        <Link
          href={`./klienct?Id=${rowData.personId}`}
          className="bg-primary text-white"
        >
          Otvorit
        </Link>
      </div>
    );
  };

  return (
    <DashboardSectionWrapper title="Klienti">
      <DataTable
        value={clientsDataState}
        paginator
        rows={11}
        emptyMessage="Nenasli sa ziadni pacienti"
        filterLocale="sk"
        filters={defaultFilters}
        aria-hidden
        dataKey="id"
        size="small"
      >
        <Column
          field="personId"
          header="ID"
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
          header="Datum registracie"
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

export default ClientsGrid;
