import Calendar from "@/components/reservations/Calendar";
import React from "react";
import ScheduleForTheDay from "./ScheduleForTheDay";
import { getAvailableReservationsAction } from "@/lib/actions/getAvailableReservations";
import { AvailableReservation } from "@/lib/shared/types";

type Props = {};

const MakeReservation = async (props: Props) => {
  const availableReservationsData =
    (await getAvailableReservationsAction()) as AvailableReservation[];

  return <Calendar data={availableReservationsData} />;
};

export default MakeReservation;
