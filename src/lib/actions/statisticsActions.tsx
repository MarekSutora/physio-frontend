import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getErrorMessage } from "../utils/utils";
import {
  TBlogPostViewsStats,
  TNewClientsStatistics,
  TRevenueStatistics,
  TServiceTypeStatistics,
} from "../shared/types";
import { getTokenForServerActions } from "./getTokenForServerActions";

export async function getServiceTypeFinishedAppointmentsCountsAction(): Promise<
  TServiceTypeStatistics[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerActions();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/appointments-service-types`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getTotalRevenueStatisticsAction(): Promise<
  TRevenueStatistics[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerActions();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/revenue`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Adjust the expected type if necessary
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getNewClientsTrendAction(): Promise<
  TNewClientsStatistics[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerActions();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/new-clients-trend`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Adjust the expected type if necessary
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getBlogPostViewsStatsAction(): Promise<
  TBlogPostViewsStats[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerActions();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/blog-post-views-stats`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Ensure the type matches what the backend sends
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
