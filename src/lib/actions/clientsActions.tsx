"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils";
import { TClient, TClientNote } from "../shared/types";
import { ca } from "date-fns/locale";

export async function getPatientsData(): Promise<TClient[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/patients`;

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
    console.error("error", error);
    throw new Error(getErrorMessage(error));
  }
}

// Function to add a note to a patient
export async function addNoteToClient(note: TClientNote): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error(
      "Session not found. User must be logged in to perform this action.",
    );
  }

  const url = `${process.env.BACKEND_API_URL}/patients/${note.clientId}/notes`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.backendTokens.accessToken}`,
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData);
  }
}

// Function to get all notes for a patient
export async function getAllNotesForPatient(
  patientId: number,
): Promise<TClientNote[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/patients/${patientId}/notes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
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

// Function to get patient details by ID
export async function getClientById(clientId: number): Promise<TClient> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error(
      "Session not found. User must be logged in to perform this action.",
    );
  }

  const url = `${process.env.BACKEND_API_URL}/patients/${clientId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.backendTokens.accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData);
  }

  const data = await response.json();
  return data;
}
