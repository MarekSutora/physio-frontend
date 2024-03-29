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

export async function getUnbookedAppointmentsAction(): Promise<
  TG_UnbookedAppointment[]
> {
  const url = `${process.env.BACKEND_API_URL}/appointments/unbooked`;

  const res = await fetch(url, {
    method: "GET",
    next: { tags: ["unbooked-appointments"] },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function createAppointmentAction(appointmentData: TC_Appointment) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/unbooked`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createBookedAppointmentAction(
  astdcId: number,
  personId?: number,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    let personIdoUse = personId ? personId : session.user?.personId;

    const url = `${process.env.BACKEND_API_URL}/appointments/booked/${personIdoUse}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify({ astdcId }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("booked-appointments");
    revalidateTag("unbooked-appointments");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteAppointmentAction(appointmentId: number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/${appointmentId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("unbooked-appointments");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getAllBookedAppointmentsAction(): Promise<
  TG_BookedAppointment[]
> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    let url = `${process.env.BACKEND_API_URL}/appointments/booked`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      next: { tags: ["booked-appointments"] },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(
      "getAllBookedAppointmentsAction: " + getErrorMessage(error),
    );
  }
}

export async function getBookedAppointmentsForClientAction(
  personId?: number,
): Promise<TG_BookedAppointment[]> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    let personIdToUse = personId ? personId : session.user?.personId;

    let url = `${process.env.BACKEND_API_URL}/appointments/client/${personIdToUse}/booked`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(
      "getBookedAppointmentsForClientAction: " + getErrorMessage(error),
    );
  }
}

export async function getFinishedAppointmentsForClientAction(
  personId?: number,
): Promise<TG_BookedAppointment[]> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    let personIdToUse = personId ? personId : session.user?.personId;

    let url = `${process.env.BACKEND_API_URL}/appointments/client/${personIdToUse}/finished`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(
      "getFinishedAppointmentsForClientAction: " + getErrorMessage(error),
    );
  }
}

export async function getAllFinishedAppointmentsAction(): Promise<
  TG_BookedAppointment[]
> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    let url = `${process.env.BACKEND_API_URL}/appointments/finished`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      next: { tags: ["all-finished-appointments"] },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(
      "getAllFinishedAppointmentsAction: " + getErrorMessage(error),
    );
  }
}

export async function deleteBookedAppointmentAction(
  bookedAppointmentId: number,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/booked/${bookedAppointmentId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("booked-appointments");
    revalidateTag("unbooked-appointments");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getAppointmentByIdAction(
  id: number,
): Promise<TAppointment> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateAppointmentDetailsAction(
  appointmentId: number,
  appointmentDetail: TAppointmentDetail,
): Promise<void> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/${appointmentId}/details`; // Endpoint might need to be updated
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(appointmentDetail),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
    // Handle success response
  } catch (error) {
    throw new Error(getErrorMessage(error));
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
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
    throw new Error(getErrorMessage(error));
  }
}

export async function markBookedAppointmentAsFinishedAction(
  id: number,
): Promise<void> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/appointments/booked/${id}/finish`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    revalidateTag("booked-appointments");
    revalidateTag("all-finished-appointments");
  } catch (error) {
    console.log("error", error);
    throw new Error(getErrorMessage(error));
  }
}
