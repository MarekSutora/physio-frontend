import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { sk } from "date-fns/locale";

type Props = {
  startTime: Date;
  setStartTime: (date: Date) => void;
};

const DatePickerComponent = ({ startTime, setStartTime }: Props) => {
  return (
    <div>
      <DatePicker
        className="w-full cursor-pointer rounded border border-slate-300 bg-transparent p-1 text-end text-base outline-none focus:outline-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
        id="startTime"
        selected={startTime}
        onChange={(startTime: Date) => setStartTime(startTime)}
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd.MM.yyyy HH:mm"
        locale={sk}
        showIcon
        timeCaption="Čas"
        showTimeSelect
        onKeyDown={(e) => e.preventDefault()}
        popperClassName="z-50"
        minTime={new Date(new Date().setHours(6, 0))}
        maxTime={new Date(new Date().setHours(23, 45))}
        required
      />
      <style>{`
        .react-datepicker {
          border: 1px solid #dae1e7;
          border-radius: 0.5rem;
        }
        
        .react-datepicker__header {
          background-color: #f9fafb;
          border-bottom: 1px solid #dae1e7;
        }
        
        .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
          width: 2.5rem;
          line-height: 2rem;
          margin: 0.166rem;
        }
        
        .react-datepicker__day--selected, 
        .react-datepicker__day--in-range, 
        .react-datepicker__day--in-selecting-range {
          background-color: primary;
          color: #fff;
        }

        .react-datepicker__day-name {
          font-size: 1rem; /* Prispôsobte veľkosť podľa potreby */
        }

        .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
          padding: 8px; /* Prispôsobte padding podľa potreby */
          font-size: 0.875rem; /* Prispôsobte veľkosť písma podľa potreby */
        }

        .react-datepicker__day--outside-month {
          visibility: hidden; /* Skryje dni mimo aktuálneho mesiaca */
        }

        .react-datepicker__day-name {
          font-size: 1rem; /* Prispôsobte veľkosť podľa potreby */
        }

        .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
          padding: 8px; 
          font-size: 0.875rem; 
        }

        /* Vymazanie dní, ktoré nie sú v tomto mesiaci */
        .react-datepicker__day--outside-month {
          visibility: hidden; /* Skryje dni mimo aktuálneho mesiaca */
        }
        
        .react-datepicker__input-container {
          position: relative;
        }
        
        .react-datepicker__input-container input {
          padding-right: 32px; /* Zmenšenie medzery medzi ikonou a poľom dátumu */
        }

        .react-datepicker__time-list-item--disabled {
            visibility: hidden;
            display: none;
        }

        .react-datepicker__calendar-icon {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default DatePickerComponent;
