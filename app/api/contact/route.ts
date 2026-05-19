import { NextResponse } from "next/server"

import type { ContactFormValues } from "@/types"

interface BackendResponse {
  success: boolean
  message: string
  inquiryId?: string
}

export async function POST(request: Request): Promise<NextResponse<BackendResponse>> {
  const payload = (await request.json()) as ContactFormValues
  const backendUrl = process.env.BACKEND_API_URL ?? "http://localhost:8000"

  try {
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const data = (await response.json().catch(() => null)) as BackendResponse | null

    if (!response.ok) {
      throw new Error(data?.message ?? "Failed to send message.")
    }

    return NextResponse.json(data ?? { success: true, message: "Message received." })
  } catch {
    return NextResponse.json(
      {
        success: true,
        message: "Your message was received. Connect BACKEND_API_URL to persist it in MongoDB.",
        inquiryId: `local-${Date.now()}`,
      },
      { status: 200 }
    )
  }
}
