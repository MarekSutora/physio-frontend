import Calendar from "@/components/reservations/Calendar";
import React from "react";
import ScheduleForTheDay from "./ScheduleForTheDay";
import { getAvailableReservations } from "@/lib/fetching/getAvailableReservations";
import { AvailableReservation } from "@/lib/shared/types";

type Props = {};

const MakeReservation = async (props: Props) => {
  const availableReservationsData =
    (await getAvailableReservations()) as AvailableReservation[];

  return <Calendar data={availableReservationsData} />;
};

export default MakeReservation;
