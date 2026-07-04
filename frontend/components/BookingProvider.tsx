"use client"

import * as React from "react"

interface BookingContextValue {
  open: boolean
  selectedService: string
  openBooking: (service?: string) => void
  closeBooking: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BookingContext = React.createContext<BookingContextValue | undefined>(undefined)

export function BookingProvider({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const [open, setOpen] = React.useState(false)
  const [selectedService, setSelectedService] = React.useState("")

  const value = React.useMemo<BookingContextValue>(
    () => ({
      open,
      selectedService,
      openBooking: (service = "") => {
        setSelectedService(service)
        setOpen(true)
      },
      closeBooking: () => {
        setOpen(false)
        setSelectedService("")
      },
      setOpen,
    }),
    [open, selectedService]
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking(): BookingContextValue {
  const context = React.useContext(BookingContext)

  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }

  return context
}
