"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { TServiceType, TG_ServiceType } from "../shared/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils/utils";
import { getTokenForServerAction } from "./getTokenForServerAction";

export async function getServiceTypesAction(): Promise<TG_ServiceType[]> {
  try {
    const url = `${process.env.BACKEND_API_URL}/service-types`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["service-types"] },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getServiceTypesAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function createNewServiceTypeAction(formData: TServiceType) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/service-types`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();

      if (
        resErrorMessage.includes("Service type with this name already exists.")
      ) {
        throw new Error("Služba s týmto názvom už existuje.");
      }
      throw new Error(resErrorMessage);
    }

    revalidatePath("/sluzby/[slug]", "page");
    revalidateTag("service-types");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("createNewServiceTypeAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function updateServiceTypeAction(formData: TServiceType) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/service-types/${formData.id}`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    revalidatePath("/sluzby/[slug]", "page");
    revalidateTag("service-types");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("updateServiceTypeAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function deleteServiceTypeAction(id: number) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/service-types/${id}`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    revalidatePath("/sluzby/[slug]", "page");
    revalidateTag("service-types");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("deleteServiceTypeAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getServiceTypeBySlugAction(
  slug: string,
): Promise<TG_ServiceType> {
  try {
    const url = `${process.env.BACKEND_API_URL}/service-types/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data: TG_ServiceType = await res.json();

    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getServiceTypeBySlugAction", errorMessage);
    throw new Error(errorMessage);
  }
}
