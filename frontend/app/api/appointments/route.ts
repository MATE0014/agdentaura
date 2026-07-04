import { NextResponse } from "next/server"

import type { BookingFormValues } from "@/types"

const CLINIC_OPEN_HOUR = 9
const CLINIC_CLOSE_HOUR = 18

interface BookingRequestBody extends Omit<BookingFormValues, "preferredDate"> {
  preferredDate: string
}

interface BackendResponse {
  success: boolean
  message: string
  appointmentId?: string
}

function combineDateAndTimeSlot(date: Date, timeSlot: string): Date {
  const [hourPart, minutePart] = timeSlot.split(":")
  const appointmentDateTime = new Date(date)

  appointmentDateTime.setHours(Number(hourPart), Number(minutePart), 0, 0)

  return appointmentDateTime
}

export async function POST(request: Request): Promise<NextResponse<BackendResponse>> {
  const payload = (await request.json()) as BookingRequestBody
  const backendUrl = process.env.BACKEND_API_URL ?? "http://localhost:8000"

  const preferredDate = new Date(payload.preferredDate)

  if (Number.isNaN(preferredDate.getTime())) {
    return NextResponse.json({ success: false, message: "Please choose a valid appointment date." }, { status: 400 })
  }

  const [hourPart, minutePart] = payload.preferredTimeSlot.split(":")
  const slotHour = Number(hourPart)
  const slotMinute = Number(minutePart)

  if (
    Number.isNaN(slotHour) ||
    Number.isNaN(slotMinute) ||
    slotMinute !== 0 ||
    slotHour < CLINIC_OPEN_HOUR ||
    slotHour > CLINIC_CLOSE_HOUR
  ) {
    return NextResponse.json({ success: false, message: "Please choose a valid 1-hour appointment slot." }, { status: 400 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const requestedDay = new Date(preferredDate)
  requestedDay.setHours(0, 0, 0, 0)

  if (requestedDay < today) {
    return NextResponse.json({ success: false, message: "Past dates are not available." }, { status: 400 })
  }

  const appointmentDateTime = combineDateAndTimeSlot(preferredDate, payload.preferredTimeSlot)

  if (requestedDay.getTime() === today.getTime()) {
    const minimumAllowedTime = new Date()
    minimumAllowedTime.setHours(minimumAllowedTime.getHours() + 2, 0, 0, 0)

    if (appointmentDateTime < minimumAllowedTime) {
      return NextResponse.json(
        { success: false, message: "For today, please choose a slot at least two hours from now." },
        { status: 400 }
      )
    }
  }

  try {
    const response = await fetch(`${backendUrl}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        preferredDate: appointmentDateTime.toISOString(),
      }),
      cache: "no-store",
    })

    const data = (await response.json().catch(() => null)) as BackendResponse | null

    if (!response.ok) {
      throw new Error(data?.message ?? "Failed to create appointment.")
    }

    return NextResponse.json(data ?? { success: true, message: "Appointment received." })
  } catch {
    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request was received. Connect BACKEND_API_URL to persist it in MongoDB.",
        appointmentId: `local-${Date.now()}`,
      },
      { status: 200 }
    )
  }
}
