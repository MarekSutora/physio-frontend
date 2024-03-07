"use server";

import { TRegistrationFormData, TResponseResult } from "../shared/types";
import { getErrorMessage } from "../utils";

export async function registerClientAction(
  formData: TRegistrationFormData,
): Promise<TResponseResult> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/registerPatient`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!res.ok) {
      console.error("Error:", res);
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
