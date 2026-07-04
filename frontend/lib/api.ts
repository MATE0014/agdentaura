import type { AppointmentResponse, BookingFormValues, ContactFormValues, ContactResponse } from "@/types"

async function postJson<TResponse>(path: string, payload: unknown): Promise<TResponse> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as
      | { detail?: string; message?: string }
      | null
    const message = errorPayload?.detail ?? errorPayload?.message ?? "Request failed."
    throw new Error(message)
  }

  return (await response.json()) as TResponse
}

export async function submitAppointment(
  values: BookingFormValues
): Promise<AppointmentResponse> {
  return postJson<AppointmentResponse>("/api/appointments", values)
}

export async function submitContact(
  values: ContactFormValues
): Promise<ContactResponse> {
  return postJson<ContactResponse>("/api/contact", values)
}
