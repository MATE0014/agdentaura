"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBooking } from "@/components/BookingProvider"
import { BookingForm } from "@/components/BookingForm"

export function BookingModal(): React.JSX.Element {
  const { open, setOpen, closeBooking, selectedService } = useBooking()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-[calc(100%-1.5rem)] !sm:max-w-5xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl leading-tight text-slate-800 sm:text-4xl dark:text-slate-100">Book an appointment</DialogTitle>
          <DialogDescription className="text-base leading-7 text-slate-600 dark:text-slate-300">
            Fill in your details, review them, and confirm a 1-hour slot that fits your schedule.
          </DialogDescription>
        </DialogHeader>
        <BookingForm submitLabel="Request Appointment" onSuccess={closeBooking} initialService={selectedService} />
      </DialogContent>
    </Dialog>
  )
}
