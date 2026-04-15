import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage = "Something went wrong.",
): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    return defaultMessage;
  }

  const normalizedMessage = message.trim();
  const looksLikeHtmlError =
    !normalizedMessage ||
    /<!doctype html|<html|<body|<div|<span|bad gateway|error code 502/i.test(
      normalizedMessage,
    ) ||
    normalizedMessage.length > 300;

  return looksLikeHtmlError ? defaultMessage : normalizedMessage;
};
