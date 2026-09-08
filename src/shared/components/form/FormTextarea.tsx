import type { InputHTMLAttributes } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { FormCampo } from "./FormCampo"
import { Textarea } from "../ui/textarea"

interface FormTextareaProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: Path<T>
  required?: boolean
}

export function FormTextarea<T extends FieldValues>({
  label,
  name,
  required,
  ...textareaProps
}: FormTextareaProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormCampo
          label={label}
          name={name}
          required={required}
          error={fieldState.error}
        >
          <Textarea
            {...field}
            {...textareaProps}
            data-testid={`textarea-${name}`}
            id={name}
            aria-invalid={fieldState.invalid}
            className="h-24 w-full resize-none rounded-md border-2 border-border p-3 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </FormCampo>
      )}
    />
  )
}
