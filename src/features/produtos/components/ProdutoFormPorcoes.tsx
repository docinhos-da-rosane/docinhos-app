import { CustomButton, Painel } from "@/shared/components"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus } from "lucide-react"
import type { ProdutoFormData } from "../schemas/produto.schema"
import { ProdutoFormPorcao } from "./ProdutoFormPorcao"

export function ProdutoFormPorcoes() {
  const { control } = useFormContext<ProdutoFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "porcoes",
  })

  return (
    <Painel className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold lg:text-2xl">Porções e Preços</h2>

          <p className="text-muted-foreground">
            Informe as opções disponíveis para este produto.
          </p>
        </div>
      </div>

      {fields.map((field, index) => (
        <ProdutoFormPorcao
          key={field.id}
          index={index}
          onRemove={() => remove(index)}
          podeRemover={fields.length > 1}
        />
      ))}

      <CustomButton
        type="button"
        variant="secondary"
        icone={<Plus className="h-5 w-5" />}
        className="text-md p-3"
        onClick={() => append({ quantidade: "", preco: "" })}
      >
        Adicionar outra porção
      </CustomButton>
    </Painel>
  )
}
