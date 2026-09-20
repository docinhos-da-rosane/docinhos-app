import { FormCampo } from "@/shared/components/form/FormCampo"
import { Input } from "@/shared/components/ui/input"
import { cn } from "cn"
import type { InputHTMLAttributes } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"

interface FormInputFileProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelInput: string
  name: Path<T>
  required?: boolean
}

export function FormInputFile<T extends FieldValues>({
  label,
  labelInput = "Selecionar arquivo",
  name,
  required,
  ...inputProps
}: FormInputFileProps<T>) {
  const { control, trigger } = useFormContext<T>()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <FormCampo
          label={label}
          name={name}
          required={required}
          error={fieldState.error}
        >
          <div>
            <Input
              {...inputProps}
              ref={ref}
              name={name}
              type="file"
              onBlur={onBlur}
              onChange={async (event) => {
                const arquivo = event.target.files?.[0]

                onChange(arquivo)
                await trigger(name)
              }}
              id={name}
              aria-invalid={fieldState.invalid}
              className="hidden"
            />
            <label
              htmlFor={name}
              className={cn(
                "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-border bg-transparent p-4 text-sm font-bold text-muted-foreground transition-colors hover:border-border/80 hover:text-muted-foreground/80",
                inputProps.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {labelInput}
            </label>
          </div>
        </FormCampo>
      )}
    />
  )
}
