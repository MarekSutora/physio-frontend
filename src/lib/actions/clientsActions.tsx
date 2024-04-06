"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getErrorMessage } from "../utils/utils";
import { TClient, TClientNote } from "../shared/types";
import { getTokenForServerAction } from "./getTokenForServerAction";

export async function getClientsData(): Promise<TClient[]> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export async function addNoteToClient(note: TClientNote): Promise<number> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients/${note.personId}/notes`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(note),
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

export async function getAllNotesForClient(
  personId: number,
): Promise<TClientNote[]> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients/${personId}/notes`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients/${personId}`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export async function deleteNoteFromClient(noteId: number): Promise<void> {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/clients/notes/${noteId}`;
    const accessToken = token.userTokens.accessToken;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }
  } catch (error) {
    console.error("Error deleting note", error);
    throw new Error(getErrorMessage(error));
  }
}
