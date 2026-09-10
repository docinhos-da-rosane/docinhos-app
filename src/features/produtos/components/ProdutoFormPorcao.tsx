import { CustomButton, FormInput } from "@/shared/components"
import { Trash2 } from "lucide-react"
import type { ProdutoFormData } from "../schemas/produto.schema"

interface ProdutoFormPorcaoProps {
  index: number
  podeRemover: boolean
  onRemove: () => void
}

export function ProdutoFormPorcao({
  index,
  podeRemover,
  onRemove,
}: ProdutoFormPorcaoProps) {
  return (
    <div className="rounded-md border-2 border-border bg-accent px-4 py-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold lg:text-xl">Porção {index + 1}</h3>

        <CustomButton
          type="button"
          variant="danger"
          icone={<Trash2 className="h-5 w-5" />}
          className="w-auto p-2"
          disabled={!podeRemover}
          onClick={onRemove}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-6">
        <FormInput<ProdutoFormData>
          label="Quantidade (un.)"
          inputMode="numeric"
          name={`porcoes.${index}.quantidade`}
          tipo="numero"
          required
          placeholder="Ex: 15"
          maxLength={5}
        />

        <FormInput<ProdutoFormData>
          label="Preço (R$)"
          inputMode="decimal"
          name={`porcoes.${index}.preco`}
          tipo="monetario"
          required
          placeholder="Ex: 10,00"
          maxLength={13}
        />
      </div>
    </div>
  )
}
