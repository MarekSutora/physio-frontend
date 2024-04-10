import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getErrorMessage } from "../utils/utils";
import {
  TBlogPostViewsStats,
  TNewClientsStatistics,
  TRevenueStatistics,
  TServiceTypeStatistics,
} from "../shared/types";
import { getTokenForServerAction } from "./getTokenForServerAction";

export async function getServiceTypeFinishedAppointmentsCountsAction(): Promise<
  TServiceTypeStatistics[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/appointments-service-types`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getServiceTypeFinishedAppointmentsCountsAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getTotalRevenueStatisticsAction(): Promise<
  TRevenueStatistics[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/revenue`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getTotalRevenueStatisticsAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getNewClientsTrendAction(): Promise<
  TNewClientsStatistics[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/new-clients-trend`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json(); 
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getNewClientsTrendAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getBlogPostViewsStatsAction(): Promise<
  TBlogPostViewsStats[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/statistics/blog-post-views-stats`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json(); 
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getBlogPostViewsStatsAction", errorMessage);
    throw new Error(errorMessage);
  }
}
