"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext<{ name: string }>(
  {} as { name: string }
)

const FormItemContext = React.createContext<{ id: string }>({} as { id: string })

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField(): {
  id: string
  name: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
  error?: { message?: string }
} {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField must be used within a FormField.")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    error: fieldState.error as { message?: string } | undefined,
  }
}

function FormItem({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>): React.JSX.Element {
  const { formItemId, error } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={Boolean(error)}
      htmlFor={formItemId}
      className={cn("data-[error=true]:text-destructive", className)}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>): React.JSX.Element {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField()

  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={Boolean(error)}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">): React.JSX.Element {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">): React.JSX.Element | null {
  const { formMessageId, error } = useFormField()
  const body = error?.message ? String(error.message) : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage }
