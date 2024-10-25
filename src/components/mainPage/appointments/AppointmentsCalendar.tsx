"use client";

import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
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
import { TG_UnbookedAppointment, TG_ServiceType } from "@/lib/shared/types";
import { cn } from "@/lib/utils/utils";
import ScheduleForTheDay from "./ScheduleForTheDay";

type Props = {
  appointmentsData: TG_UnbookedAppointment[];
  serviceTypes: TG_ServiceType[];
  columnLayout?: boolean;
};

const AppointmentsCalendar = ({
  appointmentsData,
  serviceTypes,
  columnLayout,
}: Props) => {
  let [selectedDay, setSelectedDay] = useState(startOfToday());
  let [currentMonth, setCurrentMonth] = useState(
    format(startOfToday(), "MMM-yyyy", { locale: enUS }),
  );

  const appointments = appointmentsData;

  useEffect(() => {
    const today = startOfToday();
    const closestAppointmentDateRaw = appointments
      .map((appointment) => parseISO(appointment.startTime))
      .filter((date) => isToday(date) || isAfter(date, today))
      .sort((a, b) => a.getTime() - b.getTime())[0];

    const initialSelectedDay = closestAppointmentDateRaw
      ? new Date(closestAppointmentDateRaw.setHours(0, 0, 0, 0))
      : today;

    setCurrentMonth(format(initialSelectedDay, "MMM-yyyy", { locale: enUS }));
    setSelectedDay(initialSelectedDay);
  }, [appointments]);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const isCurrentMonth = isEqual(
    getMonth(firstDayCurrentMonth),
    getMonth(selectedDay),
  );

  const selectedDayAppointments = appointments.filter((appointment) =>
    isSameDay(parseISO(appointment.startTime), selectedDay),
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
    <div
      className={cn(
        "m-auto flex h-full flex-col justify-between gap-9 py-2 lg:flex-row lg:p-6",
        columnLayout && "max-h-full flex-col lg:max-h-full lg:flex-col lg:p-1",
      )}
    >
      <div
        className={cn(
          "pt-12 lg:w-[40%]",
          columnLayout && "m-auto p-2 lg:w-11/12",
        )}
      >
        <div className="flex items-center">
          <h2 className="flex-auto select-none pl-5 text-lg font-semibold text-gray-900">
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
            <span className="sr-only">Predošlý mesiac</span>
            <FaAngleLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center rounded-lg p-1.5 text-gray-700 hover:bg-slate-200 hover:text-gray-900"
          >
            <span className="sr-only">Ďalší mesiac</span>
            <FaAngleRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-base leading-6 text-black">
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
            const isAppointmentOnDay = appointments.some((res) => {
              return isSameDay(parseISO(res.startTime), day);
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
                  disabled={!isAppointmentOnDay}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    !isEqual(day, selectedDay) && isToday(day) && "bg-green-50",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      isAppointmentOnDay &&
                      "bg-primary/30 bg-opacity-30 font-semibold hover:bg-primary/80 hover:bg-opacity-70",
                    isEqual(day, selectedDay) && "bg-primary text-white",
                    "mx-auto my-[2px] flex h-8 w-8 items-center justify-center rounded-md",
                    columnLayout && "h-6 w-4",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
                {appointments.some((res) =>
                  isSameDay(parseISO(res.startTime), day),
                ) ? (
                  isEqual(day, selectedDay) ? (
                    <div className="m-auto h-1 w-8 rounded-sm bg-primary"></div>
                  ) : (
                    <div className="m-auto h-1 w-8 rounded-sm bg-primary/30"></div>
                  )
                ) : (
                  <div className="m-auto h-1 w-8 rounded-sm"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ScheduleForTheDay
        selectedDayAppointments={selectedDayAppointments}
        selectedDay={selectedDay}
        serviceTypes={serviceTypes}
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

export default AppointmentsCalendar;
