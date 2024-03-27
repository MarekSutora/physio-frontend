"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getErrorMessage } from "../utils/utils";
import { TClient, TClientNote } from "../shared/types";

export async function getClientsData(): Promise<TClient[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients`;

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

export async function addNoteToClient(note: TClientNote): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error(
      "Session not found. User must be logged in to perform this action.",
    );
  }

  const url = `${process.env.BACKEND_API_URL}/clients/${note.personId}/notes`;
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

export async function getAllNotesForClient(
  personId: number,
): Promise<TClientNote[]> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients/${personId}/notes`;
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

export async function getClientById(personId: number): Promise<TClient> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error(
      "Session not found. User must be logged in to perform this action.",
    );
  }

  const url = `${process.env.BACKEND_API_URL}/clients/${personId}`;
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

export async function deleteNoteFromClient(noteId: number): Promise<void> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients/notes/${noteId}`;
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
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
