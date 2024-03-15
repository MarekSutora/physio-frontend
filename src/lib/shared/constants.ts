import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaChartBar,
  FaCalendarAlt,
  FaBlog,
  FaUsers,
  FaTools,
  FaCalendarCheck,
  FaHistory,
} from "react-icons/fa";
import React from "react";

export const basicLinks = [
  { text: "Domov", path: "/" },
  { text: "Služby", path: "/sluzby" },
  { text: "Kontakt", path: "/kontakt" },
  { text: "Blog", path: "/blog" },
  { text: "Rezervácia", path: "/rezervacia" },
];

export const userLinks = [
  { text: "Prihlásenie", path: "/prihlasenie" },
  { text: "Registrácia", path: "/registracia" },
] as const;

export const socialMediaLinks = [
  {
    icon: React.createElement(FaFacebook),
    path: "https://www.facebook.com/",
  },
  {
    icon: React.createElement(FaYoutube),
    path: "https://www.youtube.com/",
  },
  {
    icon: React.createElement(FaInstagram),
    path: "https://www.instagram.com/",
  },
] as const;

export const contactInfo = {
  companyName: "Meno firmy s.r.o.",
  name: "Marek Šútora",
  email: "marek.sutora@gmail.com",
  telephoneNumber: "+421 123 456 789",
  address: "P. Sherman, 42 Wallaby Way",
  zip: "958 03",
  city: "Sydney",
} as const;

export const dashboardLinks = {
  admin: [
    {
      text: "Štatistiky",
      path: "/dashboard/admin/statistiky",
      icon: React.createElement(FaChartBar),
    },
    {
      text: "Termíny",
      subMenuItems: [
        { text: "Nový termín", path: "/dashboard/admin/terminy/novy-termin" },
        {
          text: "Rezervované termíny",
          path: "/dashboard/admin/terminy/zarezervovane-terminy",
        },
        {
          text: "História",
          path: "/dashboard/admin/terminy/historia",
        },
      ],
      icon: React.createElement(FaCalendarAlt),
    },
    {
      text: "Blog",
      subMenuItems: [
        { text: "Nový článok", path: "/dashboard/admin/blog/novy-clanok" },
        { text: "Všetky články", path: "/dashboard/admin/blog/vsetky-clanky" },
      ],
      icon: React.createElement(FaBlog),
    },
    {
      text: "Klienti",
      path: "/dashboard/admin/klienti",
      icon: React.createElement(FaUsers),
    },
    {
      text: "Služby",
      path: "/dashboard/admin/sluzby",
      icon: React.createElement(FaTools),
    },
  ],
  client: [
    {
      text: "Rezervácia",
      path: "/dashboard/klient/rezervacia",
      icon: React.createElement(FaCalendarCheck),
    },
    {
      text: "História",
      path: "/dashboard/klient/historia",
      icon: React.createElement(FaHistory),
    },
    {
      text: "Zarezerované termíny",
      path: "/dashboard/klient/zarezervovane-terminy",
      icon: React.createElement(FaCalendarAlt),
    },
  ],
};

export const PrimeReactLocaleSk = {
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
} as const;

export const DesktopDashboardSectionStyle =
  "border-slate-200 bg-white p-2 md:rounded-lg md:border-2" as const;

export const SlovakMonths = [
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
] as const;
