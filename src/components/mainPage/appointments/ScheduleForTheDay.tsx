import {
  ServiceTypeOptionType,
  TG_UnbookedAppointment,
  TG_ServiceType,
} from "@/lib/shared/types";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

//TODO az potom mozno - filtrovanie sluzieb

type Props = {
  selectedDayAppointments: TG_UnbookedAppointment[];
  selectedDay: Date;
  serviceTypes: TG_ServiceType[];
};

const ScheduleForTheDay = ({
  selectedDayAppointments,
  selectedDay,
  serviceTypes,
}: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<
    ServiceTypeOptionType[]
  >(
    serviceTypes.map((st) => ({
      label: st.name,
      value: st.name,
      color: st.hexColor,
    })),
  );

  const handleServiceTypesSelectChange = (
    selected: MultiValue<ServiceTypeOptionType>,
  ) => {
    setSelectedOptions(selected.map((option) => ({ ...option })));
  };

  // useEffect(() => {
  //   handleServiceTypesSelectChange(selectedOptions);
  // }, [selectedOptions]); // Dependency array includes selectedOptions

  const filteredAppointments = selectedDayAppointments.filter((appointment) =>
    appointment.serviceTypeInfos.some(
      (arst) => selectedOptions.find((option) => option.value === arst.name), // Match based on service type name
    ),
  );

  return (
    <section className="w-full lg:w-[53%]">
      <h2 className="pb-4 text-center text-lg font-semibold text-gray-900">
        Rozvrh pre
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "do MMMM yyyy", {
            locale: sk,
          })}
        </time>
      </h2>
      <Select
        id="serviceTypes"
        instanceId="serviceTypes"
        name="serviceTypes"
        isMulti
        closeMenuOnSelect={false}
        options={serviceTypes.map((st) => ({
          label: st.name,
          value: st.name,
          color: st.hexColor,
        }))}
        styles={customStyles}
        components={makeAnimated()}
        onChange={handleServiceTypesSelectChange}
        value={selectedOptions}
        required
      />
      <div className="max-h-[500px] w-full overflow-scroll">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              appointment={appointment}
              selectedServiceTypeNames={selectedOptions.map(
                (option) => option.value,
              )} // Pass selected service type names
            />
          ))
        ) : (
          <div>No Appointments available for selected service types.</div>
        )}
      </div>
    </section>
  );
};

const customStyles = {
  option: (provided: any, { data }: any) => ({
    ...provided,
    backgroundColor: data.color && `${data.color}30`,
    color: "black",
    ":hover": {
      ...provided[":hover"],
      backgroundColor: data.color && `${data.color}40`,
    },
  }),
  multiValue: (styles: any, { data }: any) => ({
    ...styles,
    backgroundColor: data.color && `${data.color}40`,
  }),
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: "black",
  }),
};

export default ScheduleForTheDay;
