import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getErrorMessage } from "../utils";
import { TServiceTypeMonthlyStatistics } from "../shared/types";


export async function getServiceTypeMonthlyFinishedAppointmentsCountsAction(
  startYear: number = 2024,
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/service-types/monthly?startYear=${startYear}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as TServiceTypeMonthlyStatistics[];
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
