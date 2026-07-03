"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBooking } from "@/components/BookingProvider"
import { BookingForm } from "@/components/BookingForm"

export function BookingModal(): React.JSX.Element {
  const { open, setOpen, closeBooking, selectedService } = useBooking()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-[calc(100%-1.5rem)] sm:!max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-card p-4 sm:rounded-[30px] sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">Book an appointment</DialogTitle>
          <DialogDescription className="text-base leading-7 tracking-tight text-muted-foreground">
            Fill in your details, review them, and confirm a 1-hour slot that fits your schedule.
          </DialogDescription>
        </DialogHeader>
        <BookingForm submitLabel="Request Appointment" onSuccess={closeBooking} initialService={selectedService} />
      </DialogContent>
    </Dialog>
  )
}
