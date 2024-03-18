"use server";

import {
  TRegistrationFormData,
  TResetPasswordFormData,
  TResponseResult,
} from "../shared/types";
import { getErrorMessage } from "../utils";

export async function registerClientAction(
  formData: TRegistrationFormData,
): Promise<TResponseResult> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/register-client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!res.ok) {
      const errorMessage =
        (await res.json().then((data) => data.message)) ??
        "Skúste to prosím znova. 🙄";
      return { message: errorMessage, success: false };
    }

    return { message: "Registrácia prebehla úspešne. 🎉", success: true };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function forgotPasswordAction(email: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      console.log("Error:", res);
      const errorMessage =
        (await res.json().then((data) => data.message)) ??
        "Skúste to prosím znova. 🙄";
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function resetPasswordAction(
  resetPasswordData: TResetPasswordFormData,
) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordData),
      },
    );

    if (!res.ok) {
      console.log("Error:", res);
      const errorMessage =
        (await res.json().then((data) => data.message)) ??
        "Skúste to prosím znova. 🙄";
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
