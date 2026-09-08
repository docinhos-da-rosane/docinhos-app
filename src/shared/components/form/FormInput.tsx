import type { InputHTMLAttributes } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { FormCampo } from "./FormCampo"
import { Input } from "../ui/input"

type TipoInput = "texto" | "numero" | "monetario"

interface FormInputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  required?: boolean
  tipo?: TipoInput
}
const validacoesPorTipo: Record<TipoInput, (valor: string) => boolean> = {
  texto: () => true,
  numero: (valor) => /^\d*$/.test(valor),
  monetario: (valor) => /^\d*(,\d{0,2})?$/.test(valor),
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  required,
  tipo = "texto",
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
            onChange={(event) => {
              const valor = event.target.value

              if (validacoesPorTipo[tipo](valor)) {
                field.onChange(valor)
              }
            }}
            data-testid={`input-${name}`}
            id={name}
            aria-invalid={fieldState.invalid}
            className="h-12 w-full rounded-md border-2 border-border bg-white p-3 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </FormCampo>
      )}
    />
  )
}
