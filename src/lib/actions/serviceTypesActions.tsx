"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { TCU_ServiceType, TG_ServiceType } from "../shared/types";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils/utils";

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
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createNewServiceTypeAction(formData: TCU_ServiceType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/service-types`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      if (errorData.includes("Service type with this name already exists.")) {
        throw new Error("Služba s týmto názvom už existuje.");
      }
      throw new Error(errorData);
    }

    revalidateTag("service-types");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateServiceTypeAction(formData: TCU_ServiceType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/service-types/${formData.id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();

      throw new Error(errorData);
    }

    revalidateTag("service-types");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteServiceTypeAction(id: number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/service-types/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData);
    }

    revalidateTag("service-types");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getServiceTypeBySlugAction(
  slug: string,
): Promise<TG_ServiceType> {
  try {
    const url = `${process.env.BACKEND_API_URL}/service-types/${slug}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
