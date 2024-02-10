import BookReservationCalendar from "@/components/mainPage/reservations/BookReservationCalendar";
import { getAvailableReservationsAction } from "@/lib/actions/reservationActions";
import { TG_AvailableReservation } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let availableReservations: TG_AvailableReservation[] = [];
  try {
    availableReservations = await getAvailableReservationsAction();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="m-auto min-h-[600px] w-5/6 py-2 lg:p-8">
      <BookReservationCalendar availableReservations={availableReservations} />
    </section>
  );
};

export default Page;
