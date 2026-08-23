import type { InputHTMLAttributes } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { FormCampo } from "./FormCampo"
import { Input } from "@base-ui/react/input"

interface FormInputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  required?: boolean
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  required,
  ...inputProps
}: FormInputProps<T>) {
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
          <Input
            {...field}
            {...inputProps}
            data-testid={`input-${name}`}
            id={name}
            aria-invalid={fieldState.invalid}
            className="w-full rounded-md border-2 border-border p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </FormCampo>
      )}
    />
  )
}
