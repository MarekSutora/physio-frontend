"use server";

import {
  TRegistrationFormData,
  TResetPasswordFormData,
  TResponseResult,
} from "../shared/types";
import { getErrorMessage } from "../utils/utils";

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
      const resErrorMessage = (await res.text()) ?? "Skúste to prosím znova. 🙄";
      return { message: resErrorMessage, success: false };
    }

    return { message: "Registrácia prebehla úspešne. 🎉", success: true };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("registerClientAction", errorMessage);
    throw new Error(errorMessage);
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
      const resErrorMessage = (await res.text()) ?? "Skúste to prosím znova. 🙄";
      throw new Error(resErrorMessage);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("forgotPasswordAction", errorMessage);
    throw new Error(errorMessage);
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
      const resErrorMessage = (await res.text()) ?? "Skúste to prosím znova. 🙄";
      throw new Error(resErrorMessage);
    }

  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("resetPasswordAction", errorMessage);
    throw new Error(errorMessage);
  }
}
