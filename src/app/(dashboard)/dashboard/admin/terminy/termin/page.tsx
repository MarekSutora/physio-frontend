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
import WorkoutPlanForm from "@/components/dashboard/admin/appointments/plan/WorkoutPlanForm";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const dummyExerciseTypes = [
  { id: 1, name: "Bench Press" },
  { id: 2, name: "Squats" },
  { id: 3, name: "Deadlifts" },
  { id: 4, name: "Pullups" },
  { id: 5, name: "Pushups" },
];

const dummyExercisesData: TAppointmentExerciseDetail[] = [
  {
    exerciseType: dummyExerciseTypes[0],
    order: 1,
    expectedNumberOfSets: 3,
    numberOfRepetitions: 10,
    restBetweenSetsInMinutes: 2,
    successfullyPerformed: false,
  },
  {
    exerciseType: dummyExerciseTypes[1],
    order: 2,
    numberOfRepetitions: 10,
    expectedDurationInMinutes: 30,
    restAfterExerciseInMinutes: 5,
    successfullyPerformed: false,
  },
  {
    exerciseType: dummyExerciseTypes[2],
    order: 3,
    expectedNumberOfSets: 3,
    numberOfRepetitions: 10,
    restBetweenSetsInMinutes: 2,
    successfullyPerformed: false,
  },
  {
    exerciseType: dummyExerciseTypes[3],
    order: 4,
    expectedNumberOfSets: 3,
    numberOfRepetitions: 10,
    restBetweenSetsInMinutes: 2,
    successfullyPerformed: false,
  },
  {
    exerciseType: dummyExerciseTypes[4],
    order: 5,
    expectedNumberOfSets: 3,
    numberOfRepetitions: 10,
    restBetweenSetsInMinutes: 2,
    successfullyPerformed: false,
  },
];

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
      appointment?.appointmentDetail?.appointmentExerciseDetails ??
      dummyExercisesData;
  } catch (error) {
    console.error("error", error);
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
      <DashboardSectionWrapper title={"Plan"} width="w-full">
        <WorkoutPlanForm
          initialExercises={exerciseDetails}
          availableExercises={dummyExerciseTypes}
          appId={appIdNumber}
        />
      </DashboardSectionWrapper>
      {/* <DashboardSectionWrapper title={"Podrobnosti"} width="w-full lg:w-[25%]">
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
      </DashboardSectionWrapper> */}
    </div>
  );
};

export default Page;
