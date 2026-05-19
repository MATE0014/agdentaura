"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, isBefore, isSameDay, startOfToday } from "date-fns"
import { CalendarIcon } from "lucide-react"
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

const CLINIC_OPEN_HOUR = 9
const CLINIC_CLOSE_HOUR = 18
const SERVICE_NOT_SELECTED = "__service_not_selected__"

const appointmentTimeSlots = Array.from(
  { length: CLINIC_CLOSE_HOUR - CLINIC_OPEN_HOUR + 1 },
  (_, index) => {
    const hour = CLINIC_OPEN_HOUR + index
    const slotStart = new Date(2020, 0, 1, hour, 0, 0, 0)
    const slotEnd = new Date(2020, 0, 1, hour + 1, 0, 0, 0)

    return {
      value: `${hour.toString().padStart(2, "0")}:00`,
      label: `${format(slotStart, "h:mm a")} - ${format(slotEnd, "h:mm a")}`,
    }
  }
)

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

  const selectedSlotTime = parseTimeSlot(values.preferredTimeSlot)
  const selectedHour = selectedSlotTime.getHours()
  const selectedMinute = selectedSlotTime.getMinutes()

  if (selectedMinute !== 0 || selectedHour < CLINIC_OPEN_HOUR || selectedHour > CLINIC_CLOSE_HOUR) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please choose a valid 1-hour appointment slot.",
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
    <div className={cn("rounded-3xl border border-border bg-slate-50 p-6 shadow-sm dark:bg-slate-800/80", className)}>
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Appointment
        </p>
        <h2 className="font-heading text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Book your visit
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
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
                  <Input placeholder="Your full name" {...field} />
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
                  <Input placeholder="Phone number" {...field} />
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
                  <Input type="email" placeholder="you@example.com" {...field} />
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
                    <SelectTrigger className="w-full">
                      {field.value === SERVICE_NOT_SELECTED ? (
                        <span className="text-muted-foreground">Select a service</span>
                      ) : (
                        <SelectValue />
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                          "h-11 w-full justify-start border-border bg-white text-left font-normal dark:bg-slate-900",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4 text-teal-600 dark:text-teal-400" />
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
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={selectedDate ? "Choose a 1-hour slot" : "Pick a date first"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  One-hour visits are available during clinic hours, and today starts at least two hours from now.
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
                  <Textarea
                    placeholder="Tell us about your concern or preferred appointment time."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2 flex items-center gap-4">
            <Button type="submit" className="h-11 rounded-full bg-teal-600 px-6 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300">
              {submitLabel}
            </Button>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Preferred date/time: {selectedDate ? format(selectedDate, "PPPP") : "not selected"}
              {selectedDate && selectedTimeSlot ? ` at ${format(parseTimeSlot(selectedTimeSlot), "h:mm a")}` : ""}
            </p>
          </div>
        </form>
      </Form>

      <Dialog open={showConfirmation} onOpenChange={(open) => (open ? setShowConfirmation(true) : handleCancelReview())}>
        <DialogContent className="!max-w-[calc(100%-1.5rem)] bg-white p-6 sm:!max-w-2xl dark:bg-slate-900" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl leading-tight text-slate-800 dark:text-slate-100">
              Confirm appointment details
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Please review the details below before we send your appointment request.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
            {confirmationDetails.map((detail) => (
              <div key={detail.label} className="grid gap-1 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4">
                <span className="font-semibold text-slate-500 dark:text-slate-400">{detail.label}</span>
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
              className="h-11 rounded-full bg-teal-600 px-6 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300"
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
