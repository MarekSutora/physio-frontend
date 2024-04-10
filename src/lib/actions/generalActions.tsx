"use server";

import { TContactFormData } from "../shared/types";
import { getErrorMessage } from "../utils/utils";

export async function sendContactFormEmail(formData: TContactFormData) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/email/contact-form`,
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
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("sendContactFormEmail", errorMessage);
    throw new Error(errorMessage);
  }
}
