import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface NavLink {
  href: string
  label: string
}

export interface ServiceTabItem {
  icon: IconDefinition
  title: string
  description: string
}

export interface ServiceCard {
  icon: IconDefinition
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface ClinicStat {
  value: string
  label: string
}


export interface ClinicValue {
  icon: IconDefinition
  title: string
  description: string
}

export interface ContactDetail {
  icon: IconDefinition
  label: string
  value: string
}

export interface SocialLink {
  icon: IconDefinition
  label: string
  href: string
}

export interface BookingFormValues {
  fullName: string
  phone: string
  email: string
  service: string
  preferredDate: Date
  preferredTimeSlot: string
  message: string
}

export interface ContactFormValues {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ApiMessageResponse {
  success: boolean
  message: string
}

export interface AppointmentResponse extends ApiMessageResponse {
  appointmentId?: string
}

export interface ContactResponse extends ApiMessageResponse {
  inquiryId?: string
}

export interface BookingServiceOption {
  value: string
  label: string
}
