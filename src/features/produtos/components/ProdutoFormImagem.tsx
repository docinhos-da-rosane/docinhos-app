import { FormInputFile, Painel } from "@/shared/components"
import type { ProdutoFormData } from "../schemas/produto.schema"
import { useFormContext } from "react-hook-form"
import { ProdutoFormImagemPreview } from "./ProdutoFormImagemPreview"
import {
  TAMANHO_MAXIMO_IMAGEM,
  TIPOS_IMAGEM_PERMITIDOS,
} from "../schemas/produto.imagem.schema"

interface ProdutoFormImagemProps {
  desativar?: boolean
}

export function ProdutoFormImagem({ desativar }: ProdutoFormImagemProps) {
  const { watch } = useFormContext<ProdutoFormData>()
  const imagem = watch("imagem")

  function isImagemValida() {
    if (!imagem) return false
    return (
      TIPOS_IMAGEM_PERMITIDOS.includes(imagem.type) &&
      imagem.size <= TAMANHO_MAXIMO_IMAGEM
    )
  }

  return (
    <Painel>
      <h2 className="mb-4 text-xl font-bold lg:text-2xl">Foto do Produto</h2>
      <div className="flex flex-col gap-4">
        <ProdutoFormImagemPreview imagemValida={isImagemValida()} />
        <FormInputFile<ProdutoFormData>
          name="imagem"
          labelInput={isImagemValida() ? "Alterar foto" : "Selecionar foto *"}
          accept={TIPOS_IMAGEM_PERMITIDOS.join(",")}
          disabled={desativar}
        />
      </div>
    </Painel>
  )
}
