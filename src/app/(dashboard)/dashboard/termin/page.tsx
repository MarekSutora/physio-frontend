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
    console.log("error", error);
  }

  if (appointment) {
    return (
      <div className="flex h-full w-full flex-col gap-2">
        <DashboardSectionWrapper
          title={"Podrobnosti"}
          width="w-full"
          height="h-fit"
        >
          <div className="mx-0 mt-6 flex flex-row flex-wrap items-start">
            <h2>
              <span>Dátum: </span>{" "}
              <span className="font-semibold">
                {new Date(appointment?.startTime).toLocaleDateString("sk")}
              </span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300"></div>
            <h2>
              <span>Cena: </span>{" "}
              <span className="font-semibold">
                {appointment?.bookedAppointments[0].cost}€
              </span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300"></div>
            <h2>
              <span>Typ: </span>{" "}
              <span className="font-semibold">
                {appointment?.bookedAppointments[0].serviceTypeName}
              </span>
            </h2>
            <div className="mx-2 h-6 w-[1px] bg-gray-300"></div>
            <div className="max-h-[500px] overflow-y-auto">
              {appointment?.bookedAppointments.map((ba) => (
                <div key={ba.id} className="lex-row flex gap-2 ">
                  <span>
                    {"Klient: "}
                    <span className="font-semibold">
                      {ba.clientId
                        ? +ba.clientId + " - "
                        : "Klient: Neznámy - "}
                      {ba.clientFirstName + " " + ba.clientSecondName + " - "}
                    </span>
                  </span>
                  <span>
                    Dátum rezervácie:{" "}
                    <span className="font-semibold">
                      {new Date(ba.appointmentBookedDate).toLocaleDateString(
                        "sk",
                      )}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
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
    <div>Not Found</div>;
  }
};

export default Page;
