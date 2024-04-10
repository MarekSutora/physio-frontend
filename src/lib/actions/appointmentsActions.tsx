"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils/utils";
import {
  TAppointment,
  TAppointmentDetail,
  TC_Appointment,
  TExerciseType,
  TG_BookedAppointment,
  TG_UnbookedAppointment,
} from "../shared/types";
import { getTokenForServerAction } from "./getTokenForServerAction";

export async function getUnbookedAppointmentsAction(): Promise<
  TG_UnbookedAppointment[]
> {
  try {
    const url = `${process.env.BACKEND_API_URL}/appointments/unbooked`;

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["unbooked-appointments"] },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getUnbookedAppointmentsAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function createAppointmentAction(appointmentData: TC_Appointment) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/unbooked`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(appointmentData),
    });

    if (!res.ok) {
      const errorData = await res.text();

      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("createAppointmentAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function createBookedAppointmentAction(
  astdcId: number,
  personId?: number,
) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const personIdToUse = personId ? personId : token.user?.personId;
    const accessToken = token.userTokens.accessToken;

    const url = `${process.env.BACKEND_API_URL}/appointments/booked/${personIdToUse}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ astdcId }),
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    revalidateTag("booked-appointments");
    revalidateTag("unbooked-appointments");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("createBookedAppointmentAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function deleteAppointmentAction(appointmentId: number) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/${appointmentId}`;
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

    revalidateTag("unbooked-appointments");
    revalidateTag("booked-appointments");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("deleteAppointmentAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getAllBookedAppointmentsAction(): Promise<
  TG_BookedAppointment[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    let url = `${process.env.BACKEND_API_URL}/appointments/booked`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.userTokens.accessToken}`,
      },
      next: { tags: ["booked-appointments"] },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getAllBookedAppointmentsAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getBookedAppointmentsForClientAction(
  personId?: number,
): Promise<TG_BookedAppointment[]> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const personIdToUse = personId ? personId : token.user.personId;

    const url = `${process.env.BACKEND_API_URL}/appointments/clients/${personIdToUse}/booked`;
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
    return data.length > 0 ? data : [];
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getBookedAppointmentsForClientAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getFinishedAppointmentsForClientAction(
  personId?: number,
): Promise<TG_BookedAppointment[]> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const personIdToUse = personId ? personId : token.user.personId;

    const url = `${process.env.BACKEND_API_URL}/appointments/clients/${personIdToUse}/finished`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();

      throw new Error(errorMessage);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getFinishedAppointmentsForClientAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getAllFinishedAppointmentsAction(): Promise<
  TG_BookedAppointment[]
> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/finished`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["all-finished-appointments"] },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getAllFinishedAppointmentsAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function deleteBookedAppointmentAction(
  bookedAppointmentId: number,
) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/booked/${bookedAppointmentId}`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(getErrorMessage(errorData));
    }

    revalidateTag("booked-appointments");
    revalidateTag("unbooked-appointments");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("deleteBookedAppointmentAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getAppointmentByIdAction(
  appointmentId: number,
): Promise<TAppointment> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/${appointmentId}`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getAppointmentByIdAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function updateAppointmentDetailsAction(
  appointmentId: number,
  appointmentDetail: TAppointmentDetail,
): Promise<void> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/${appointmentId}/details`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      body: JSON.stringify(appointmentDetail),
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("updateAppointmentDetailsAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getAllExerciseTypesAction(): Promise<TExerciseType[]> {
  try {
    const url = `${process.env.BACKEND_API_URL}/exercise-types`;

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

    const data = await res.json();

    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("getAllExerciseTypesAction", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function markBookedAppointmentAsFinishedAction(
  id: number,
): Promise<void> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/booked/${id}/finish`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const resErrorMessage = await res.text();
      throw new Error(resErrorMessage);
    }

    revalidateTag("booked-appointments");
    revalidateTag("all-finished-appointments");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("markBookedAppointmentAsFinishedAction", errorMessage);
    throw new Error(errorMessage);
  }
}
