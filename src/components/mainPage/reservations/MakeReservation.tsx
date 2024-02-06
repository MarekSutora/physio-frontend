import Calendar from "@/components/reservations/Calendar";
import React from "react";
import ScheduleForTheDay from "./ScheduleForTheDay";
import { getAvailableReservationsAction } from "@/lib/actions/getAvailableReservations";

type Props = {};

const MakeReservation = async (props: Props) => {
  const availableReservationsData = [];

  return <Calendar data={availableReservationsData} />;
};

export default MakeReservation;
