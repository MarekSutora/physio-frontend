"use client";

import { cn } from "@/lib/utils";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getMonth,
  isAfter,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import ScheduleForTheDay from "./ScheduleForTheDay";
import { AvailableReservation } from "@/lib/shared/types";

type Props = {
  data: AvailableReservation[];
};

//TODO bug ked sa dostanem na rovnaky mesiac ako je teraz ale o rok neskor

const Calendar = ({ data }: Props) => {
  const today = startOfToday();
  const closestReservationDate = data
    .map((reservation) => parseISO(reservation.date))
    .filter((date) => isToday(date) || isAfter(date, today))
    .sort((a, b) => a.getTime() - b.getTime())[0]; // Get the earliest date after sorting

  // Initialize selectedDay with the closest reservation date or today if none is found
  let [selectedDay, setSelectedDay] = useState(closestReservationDate || today);
  let [currentMonth, setCurrentMonth] = useState(
    format(selectedDay, "MMM-yyyy", { locale: enUS }),
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const isCurrentMonth = isEqual(
    getMonth(firstDayCurrentMonth),
    getMonth(selectedDay),
  );

  const selectedDayReservations = data.filter((reservation) =>
    isSameDay(parseISO(reservation.date), selectedDay),
  );

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="flex h-full w-full flex-col justify-between gap-9 lg:flex-row">
      <div className="lg:w-[43%]">
        <div className="flex items-center">
          <h2 className="flex-auto select-none text-lg font-semibold text-gray-900">
            {getMonthNameSk(
              format(firstDayCurrentMonth, "MMMM", { locale: enUS }),
            )}{" "}
            {format(firstDayCurrentMonth, "yyyy")}
          </h2>
          <button
            type="button"
            disabled={isCurrentMonth}
            onClick={previousMonth}
            className={cn(
              !isCurrentMonth &&
                "-my-1.5 flex flex-none items-center justify-center rounded-lg p-1.5 text-gray-700 hover:bg-slate-200 hover:text-gray-900",
              isCurrentMonth && "cursor-default opacity-0",
            )}
          >
            <span className="sr-only">Predosli mesiac</span>
            <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center rounded-lg p-1.5 text-gray-700 hover:bg-slate-200 hover:text-gray-900"
          >
            <span className="sr-only">Dalsi mesiac</span>
            <FaAngleRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-base leading-6 text-gray-500">
          <div>Po</div>
          <div>Ut</div>
          <div>St</div>
          <div>Št</div>
          <div>Pi</div>
          <div>So</div>
          <div>Ne</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => {
            const isReservationOnDay = data.some((res) => {
              return isSameDay(parseISO(res.date), day);
            });

            return (
              <div
                key={day.toString()}
                className={cn(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "border-b border-gray-100 py-1.5",
                )}
              >
                <button
                  disabled={!isReservationOnDay}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) && isToday(day) && "bg-green-50",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    isEqual(day, selectedDay) && "bg-primary",
                    !isEqual(day, selectedDay) &&
                      isReservationOnDay &&
                      "bg-tertiary bg-opacity-30 font-semibold hover:bg-gray-200",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
                {data.some((res) => isSameDay(parseISO(res.date), day)) && (
                  <div className="m-auto mt-1 h-1 w-1/2 rounded-lg bg-primary"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ScheduleForTheDay
        selectedDayReservations={selectedDayReservations}
        selectedDay={selectedDay}
      />
    </div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const monthNamesSk: { [key: string]: string } = {
  January: "Január",
  February: "Február",
  March: "Marec",
  April: "Apríl",
  May: "Máj",
  June: "Jún",
  July: "Júl",
  August: "August",
  September: "September",
  October: "Október",
  November: "November",
  December: "December",
};

function getMonthNameSk(month: string): string {
  return monthNamesSk[month] || month;
}

export default Calendar;
