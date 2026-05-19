"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { submitContact } from "@/lib/api"
import type { ContactFormValues } from "@/types"

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  subject: z.string().min(3, "Please add a subject."),
  message: z.string().min(10, "Please add your message.").max(1000),
})

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps): React.JSX.Element {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  const handleSubmit = async (values: ContactFormValues): Promise<void> => {
    try {
      const response = await submitContact(values)
      toast.success(response.message)
      form.reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message right now."
      toast.error(message)
    }
  }

  return (
    <div className={cn("rounded-3xl border border-border bg-slate-50 p-6 shadow-sm dark:bg-slate-800/80", className)}>
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          Contact Form
        </p>
        <h2 className="font-heading text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Send us a message
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Use this form for general inquiries, treatment questions, or to request a callback.
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(handleSubmit)}>
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Subject of your enquiry" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Textarea placeholder="How can we help you?" className="min-h-40" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2 flex justify-start">
            <Button type="submit" className="h-11 rounded-full bg-teal-600 px-6 text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300">
              Send Message
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
