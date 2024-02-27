import React from "react";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import BlogPostForm from "@/components/dashboard/admin/blog/BlogPostForm";
import {
  TAppointment,
  TAppointmentExerciseDetail,
  TBlogPost,
} from "@/lib/shared/types";
import { getBlogPostBySlugAction } from "@/lib/actions/blogActions";
import { getAppointmentByIdAction } from "@/lib/actions/appointmentsActions";
import WorkoutPlanForm from "@/components/dashboard/admin/appointments/WorkoutPlanForm";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  let appointment: TAppointment | undefined = undefined;
  let exerciseDetails: TAppointmentExerciseDetail[] = [];
  const appId = props.searchParams.appId;

  //convert appId to number
  let appIdNumber = -1;
  if (appId) {
    appIdNumber = parseInt(appId as string);
  }

  try {
    appointment = await getAppointmentByIdAction(appIdNumber);
    exerciseDetails =
      appointment?.appointmentDetail.appointmentExerciseDetails ?? [];
  } catch (error) {
    console.error("error", error);
  }

  const someRandomExerciseNames = [
    "Bench Press",
    "Squats",
    "Deadlifts",
    "Pullups",
    "Pushups",
  ].map((name) => ({ label: name, value: name }));

  return (
    <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
      <DashboardSectionWrapper title={"Plan"} width="w-full lg:w-[75%]">
        <WorkoutPlanForm
          initialExercises={exerciseDetails}
          availableExercises={someRandomExerciseNames}
        />
      </DashboardSectionWrapper>
      <DashboardSectionWrapper title={"Podrobnosti"} width="w-full lg:w-[25%]">
        <h1 className="text-2xl font-semibold">
          {appointment?.bookedAppointments[0].serviceTypeName}
        </h1>
        <p className="mb-2">
          Dátum: {appointment?.startTime.toLocaleString("sk")}
        </p>
        <p className="mb-2">Cena: {appointment?.bookedAppointments[0].cost}€</p>
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
    </div>
  );
};

export default Page;
