export const dynamic = "force-dynamic";

import React from "react";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import {
  TAppointment,
  TAppointmentDetail,
  TExerciseType,
} from "@/lib/shared/types";
import {
  getAllExerciseTypesAction,
  getAppointmentByIdAction,
} from "@/lib/actions/appointmentsActions";
import WorkoutPlanForm from "@/components/dashboard/admin/appointments/plan/WorkoutPlanForm";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  let appointment: TAppointment | undefined = undefined;
  const appId = props.searchParams.appId;
  let exerciseTypes: TExerciseType[] = [];

  let appointmentDetail: TAppointmentDetail;

  let appIdNumber = -1;
  if (appId) {
    appIdNumber = parseInt(appId as string);
  }

  try {
    appointment = await getAppointmentByIdAction(appIdNumber);
    if (
      appointment.appointmentDetail &&
      appointment.appointmentDetail.appointmentExerciseDetails
    ) {
      appointmentDetail = appointment.appointmentDetail;
    }

    exerciseTypes = await getAllExerciseTypesAction();
  } catch (error) {
    console.error("error", error);
  }

  if (appointment) {
    return (
      <div className="flex h-full w-full flex-col gap-2">
        <DashboardSectionWrapper
          title={"Podrobnosti"}
          width="w-full lg:h-[20%]"
        >
          <h1 className="text-2xl font-semibold">
            {appointment?.bookedAppointments[0].serviceTypeName}
          </h1>
          <p className="mb-2">
            Dátum: {appointment?.startTime.toLocaleString("sk")}
          </p>
          <p className="mb-2">
            Cena: {appointment?.bookedAppointments[0].cost}€
          </p>
          <li className="over max-h-[500px]">
            {appointment?.bookedAppointments.map((ba) => (
              <div key={ba.id}>
                <p>
                  {ba.clientId ? "Klient: " + ba.clientId : "Klient: Neznámy"}
                </p>
                <p> {ba.clientFirstName + " " + ba.clientSecondName}</p>
                <p>
                  Datum rezervacie:{" "}
                  {ba.appointmentBookedDate.toLocaleString("sk")}
                </p>
              </div>
            ))}
          </li>
        </DashboardSectionWrapper>
        <DashboardSectionWrapper title={"Plan"} width="w-full">
          <WorkoutPlanForm
            exerciseTypes={exerciseTypes}
            appointmentDetail={appointment.appointmentDetail}
            appointmentId={appointment.id}
          />
        </DashboardSectionWrapper>
      </div>
    );
  } else {
    <div>Not found</div>;
  }
};

export default Page;
