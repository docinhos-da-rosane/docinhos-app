import type { FieldError as RHFFieldError } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"

interface FormCampoProps {
  label: string
  name: string
  required?: boolean
  error?: RHFFieldError
  children: React.ReactNode
}

export function FormCampo({
  label,
  name,
  required,
  error,
  children,
}: FormCampoProps) {
  return (
    <Field data-invalid={!!error} className="mb-4 gap-0">
      <FieldLabel htmlFor={name} className="text-md mb-2 ml-1">
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      {children}
      <div className="mt-1 ml-1 h-3 text-sm">
        {error && <FieldError errors={[error]} />}
      </div>
    </Field>
  )
}
