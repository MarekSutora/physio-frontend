import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { TServiceType } from "../shared/types";

// Helper function to extract error messages
function getErrorMessage(error: any): string {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

export async function createNewServiceTypeAction(formData: TServiceType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/service-types`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(formData),
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

export async function getServiceTypesAction(): Promise<TServiceType[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/service-types`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
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

export async function updateServiceTypeAction(formData: TServiceType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/service-types/${formData.id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(formData),
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

export async function deleteServiceTypeAction(id: number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/service-types/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
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
