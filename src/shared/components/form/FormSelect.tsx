import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { FormCampo } from "./FormCampo"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type { Opcao } from "@/shared/models/opcao.types"

interface FormSelectProps<T extends FieldValues> {
  label: string
  name: Path<T>
  placeholder: string
  required?: boolean
  opcoes: Opcao[]
}

export function FormSelect<T extends FieldValues>({
  label,
  name,
  required,
  placeholder,
  opcoes,
}: FormSelectProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormCampo
          label={label}
          name={name}
          required={required}
          error={fieldState.error}
        >
          <Select
            onValueChange={(value) => value && field.onChange(value)}
            onOpenChange={(open) => {
              if (!open) {
                field.onBlur()
              }
            }}
            value={field.value}
          >
            <SelectTrigger
              id={name}
              ref={field.ref}
              aria-invalid={!!fieldState.error}
              data-testid={`select-${name}`}
              className="w-full rounded-md border-2 border-border p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <SelectValue placeholder={placeholder}>
                {(value) =>
                  opcoes.find((opcao) => opcao.valor === value)?.label ??
                  placeholder
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-35 overflow-y-auto rounded-md">
              <SelectGroup className="rounded-md">
                {opcoes.map((opcao) => (
                  <SelectItem
                    data-testid={`select-item-${name}`}
                    key={opcao.valor}
                    value={opcao.valor}
                    className="cursor-pointer rounded-md p-2 text-sm hover:bg-primary/10 focus:bg-primary/20"
                  >
                    {opcao.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormCampo>
      )}
    />
  )
}
