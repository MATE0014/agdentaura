"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, isBefore, isSameDay, startOfToday } from "date-fns"
import { CalendarIcon, Clock, Mail, MessageSquare, Phone, Stethoscope, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { bookingServiceOptions } from "@/lib/site"
import { submitAppointment } from "@/lib/api"
import type { BookingFormValues } from "@/types"

const SERVICE_NOT_SELECTED = "__service_not_selected__"

// Actual clinic working hours (matches siteConfig.hours): morning and evening windows.
const CLINIC_HOURS = [
  { open: "09:30", close: "14:00" },
  { open: "17:00", close: "20:00" },
] as const
const SLOT_DURATION_MINUTES = 60

function timeStringToMinutes(time: string): number {
  const [hourPart, minutePart] = time.split(":")
  return Number(hourPart) * 60 + Number(minutePart)
}

function minutesToTimeString(totalMinutes: number): string {
  const hour = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

function minutesToLabel(totalMinutes: number): string {
  return format(new Date(2020, 0, 1, Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0), "h:mm a")
}

// Generate one-hour slots that fit entirely inside each clinic working window.
const appointmentTimeSlots = CLINIC_HOURS.flatMap(({ open, close }) => {
  const openMinutes = timeStringToMinutes(open)
  const closeMinutes = timeStringToMinutes(close)
  const slots: { value: string; label: string }[] = []

  for (
    let start = openMinutes;
    start + SLOT_DURATION_MINUTES <= closeMinutes;
    start += SLOT_DURATION_MINUTES
  ) {
    slots.push({
      value: minutesToTimeString(start),
      label: `${minutesToLabel(start)} - ${minutesToLabel(start + SLOT_DURATION_MINUTES)}`,
    })
  }

  return slots
})

const validTimeSlotValues = new Set(appointmentTimeSlots.map((slot) => slot.value))

function parseTimeSlot(timeSlot: string): Date {
  const [hourPart, minutePart] = timeSlot.split(":")

  return new Date(2020, 0, 1, Number(hourPart), Number(minutePart), 0, 0)
}

function combineDateAndTimeSlot(date: Date, timeSlot: string): Date {
  const [hourPart, minutePart] = timeSlot.split(":")
  const appointmentDateTime = new Date(date)

  appointmentDateTime.setHours(Number(hourPart), Number(minutePart), 0, 0)

  return appointmentDateTime
}

const bookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  service: z.string().refine((value) => value !== SERVICE_NOT_SELECTED, {
    message: "Please select a service.",
  }),
  preferredDate: z.date({ error: "Please choose a preferred date." }),
  preferredTimeSlot: z.string().min(1, "Please choose a preferred time slot."),
  message: z.string().min(10, "Please add a short message.").max(600),
}).superRefine((values, context) => {
  if (isBefore(values.preferredDate, startOfToday())) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Past dates are not available.",
      path: ["preferredDate"],
    })

    return
  }

  if (!validTimeSlotValues.has(values.preferredTimeSlot)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please choose a valid 1-hour slot within clinic hours.",
      path: ["preferredTimeSlot"],
    })

    return
  }

  if (isSameDay(values.preferredDate, new Date())) {
    const minimumAllowedTime = new Date()
    minimumAllowedTime.setHours(minimumAllowedTime.getHours() + 2, 0, 0, 0)

    if (isBefore(combineDateAndTimeSlot(values.preferredDate, values.preferredTimeSlot), minimumAllowedTime)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "For today, please choose a slot at least two hours from now.",
        path: ["preferredTimeSlot"],
      })
    }
  }
})

interface BookingFormProps {
  className?: string
  onSuccess?: () => void
  submitLabel?: string
  initialService?: string
}

export function BookingForm({
  className,
  onSuccess,
  submitLabel = "Submit Appointment",
  initialService = "",
}: BookingFormProps): React.JSX.Element {
  const selectedServiceValue = initialService || SERVICE_NOT_SELECTED
  const [pendingBooking, setPendingBooking] = React.useState<BookingFormValues | null>(null)
  const [showConfirmation, setShowConfirmation] = React.useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: selectedServiceValue,
      preferredDate: undefined,
      preferredTimeSlot: "",
      message: "",
    },
  })

  React.useEffect(() => {
    form.setValue("service", initialService || SERVICE_NOT_SELECTED, { shouldDirty: false, shouldValidate: false })
  }, [form, initialService])

  const selectedDate = form.watch("preferredDate")
  const selectedTimeSlot = form.watch("preferredTimeSlot")

  const availableTimeSlots = React.useMemo(() => {
    if (!selectedDate || !isSameDay(selectedDate, new Date())) {
      return appointmentTimeSlots
    }

    const minimumAllowedTime = new Date()
    minimumAllowedTime.setHours(minimumAllowedTime.getHours() + 2, 0, 0, 0)

    return appointmentTimeSlots.filter((timeSlot) => {
      const slotDateTime = combineDateAndTimeSlot(selectedDate, timeSlot.value)
      return !isBefore(slotDateTime, minimumAllowedTime)
    })
  }, [selectedDate])

  React.useEffect(() => {
    if (!selectedTimeSlot) {
      return
    }

    const slotIsAvailable = availableTimeSlots.some((timeSlot) => timeSlot.value === selectedTimeSlot)

    if (!slotIsAvailable) {
      form.setValue("preferredTimeSlot", "", { shouldDirty: true, shouldValidate: true })
    }
  }, [availableTimeSlots, form, selectedTimeSlot])

  const handleReviewSubmit = (values: BookingFormValues): void => {
    setPendingBooking(values)
    setShowConfirmation(true)
  }

  const handleConfirmBooking = async (): Promise<void> => {
    if (!pendingBooking) {
      return
    }

    try {
      const response = await submitAppointment(pendingBooking)
      toast.success(response.message)
      form.reset()
      setShowConfirmation(false)
      setPendingBooking(null)
      onSuccess?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your booking right now."
      toast.error(message)
    }
  }

  const handleCancelReview = (): void => {
    setShowConfirmation(false)
  }

  const confirmationDetails = pendingBooking
    ? [
        { label: "Full name", value: pendingBooking.fullName },
        { label: "Phone", value: pendingBooking.phone },
        { label: "Email", value: pendingBooking.email },
        {
          label: "Service",
          value: bookingServiceOptions.find((option) => option.value === pendingBooking.service)?.label ?? pendingBooking.service,
        },
        { label: "Preferred date", value: format(pendingBooking.preferredDate, "PPPP") },
        {
          label: "Preferred time",
          value:
            appointmentTimeSlots.find((timeSlot) => timeSlot.value === pendingBooking.preferredTimeSlot)?.label ??
            pendingBooking.preferredTimeSlot,
        },
        { label: "Message", value: pendingBooking.message },
      ]
    : []

  return (
    <div className={cn("rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow-feature)] sm:rounded-[45px] sm:p-10", className)}>
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Appointment
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Book your visit
        </h2>
        <p className="max-w-2xl text-sm leading-6 tracking-tight text-muted-foreground">
          Share a few details and the doctor will follow up with the right treatment slot.
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(handleReviewSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand" />
                    <Input placeholder="Your full name" className="h-11 rounded-full pl-11" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand" />
                    <Input placeholder="Phone number" className="h-11 rounded-full pl-11" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand" />
                    <Input type="email" placeholder="you@example.com" className="h-11 rounded-full pl-11" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Service</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full rounded-full pl-4 [&>span[data-slot=select-value]]:flex-1 [&>span[data-slot=select-value]]:text-left">
                      <Stethoscope className="size-4 shrink-0 text-brand" />
                      {field.value === SERVICE_NOT_SELECTED ? (
                        <span className="flex-1 text-left text-muted-foreground">Select a service</span>
                      ) : (
                        <SelectValue />
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="max-h-72">
                    {bookingServiceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-11 w-full justify-start rounded-full border-border bg-background pl-4 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4 shrink-0 text-brand" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => isBefore(date, startOfToday())}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredTimeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time Slot</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDate}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full rounded-full pl-4 [&>span[data-slot=select-value]]:flex-1 [&>span[data-slot=select-value]]:text-left">
                      <Clock className="size-4 shrink-0 text-brand" />
                      <SelectValue placeholder={selectedDate ? "Choose a 1-hour slot" : "Pick a date first"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="max-h-72">
                    {availableTimeSlots.length > 0 ? (
                      availableTimeSlots.map((timeSlot) => (
                        <SelectItem key={timeSlot.value} value={timeSlot.value}>
                          {timeSlot.label}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-available-slots">
                        No slots available today
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
                <p className="text-xs leading-5 tracking-tight text-muted-foreground">
                  One-hour visits during clinic hours (morning &amp; evening). For today, the earliest slot is at least two hours from now.
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-4 top-3.5 size-4 text-brand" />
                    <Textarea
                      placeholder="Tell us about your concern or preferred appointment time."
                      className="min-h-32 rounded-3xl pl-11 pt-3"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2 flex items-center gap-4">
            <Button type="submit" className="h-11 rounded-full border border-foreground bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">
              {submitLabel}
            </Button>
            <p className="text-sm tracking-tight text-muted-foreground">
              Preferred date/time: {selectedDate ? format(selectedDate, "PPPP") : "not selected"}
              {selectedDate && selectedTimeSlot ? ` at ${format(parseTimeSlot(selectedTimeSlot), "h:mm a")}` : ""}
            </p>
          </div>
        </form>
      </Form>

      <Dialog open={showConfirmation} onOpenChange={(open) => (open ? setShowConfirmation(true) : handleCancelReview())}>
        <DialogContent className="!max-w-[calc(100%-1.5rem)] rounded-[30px] bg-card p-8 sm:!max-w-2xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Confirm appointment details
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 tracking-tight text-muted-foreground">
              Please review the details below before we send your appointment request.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 rounded-[24px] border border-border bg-background p-5 text-sm tracking-tight text-foreground/90">
            {confirmationDetails.map((detail) => (
              <div key={detail.label} className="grid gap-1 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4">
                <span className="font-semibold text-muted-foreground">{detail.label}</span>
                <span className="break-words">{detail.value}</span>
              </div>
            ))}
          </div>

          <DialogFooter className="rounded-b-none border-t-0 bg-transparent px-0 pb-0 pt-2">
            <Button type="button" variant="outline" className="h-11 rounded-full px-6" onClick={handleCancelReview}>
              Edit details
            </Button>
            <Button
              type="button"
              className="h-11 rounded-full border border-foreground bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              onClick={handleConfirmBooking}
            >
              Confirm and book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
