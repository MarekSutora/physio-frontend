"use client";

import { cn } from "@/lib/utils";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { enUS, sk } from "date-fns/locale";
import { useState } from "react";

export default function Example() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(
    format(today, "MMM-yyyy", { locale: enUS }),
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto select-none font-semibold text-gray-900">
                {getMonthNameSk(
                  format(firstDayCurrentMonth, "MMMM", { locale: enUS }),
                )}{" "}
                {format(firstDayCurrentMonth, "yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-slate-200 hover:text-gray-900"
              >
                <span className="sr-only">Predosli mesiac</span>
                <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-slate-200 hover:text-gray-900"
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
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "border-b border-gray-100 py-1.5",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-green-50 text-[#14746F]",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-primary",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Rozvrh pre {" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "do MMMM yyyy", { locale: sk })}
              </time>
            </h2>
          </section>
        </div>
      </div>
    </div>
  );
}

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
