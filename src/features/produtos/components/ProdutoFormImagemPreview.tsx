import { useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"
import type { ProdutoFormData } from "../schemas/produto.schema"

interface ProdutoFormImagemPreviewProps {
  imagemValida: boolean
}

export function ProdutoFormImagemPreview({
  imagemValida,
}: ProdutoFormImagemPreviewProps) {
  const { watch } = useFormContext<ProdutoFormData>()
  const imagemRef = useRef<HTMLImageElement>(null)
  const imagem = watch("imagem")
  const deveExibirImagem = Boolean(imagem && imagemValida)

  useEffect(() => {
    if (!deveExibirImagem || !imagem || !imagemRef.current) return

    const imagemElement = imagemRef.current
    const url = URL.createObjectURL(imagem)

    imagemElement.src = url

    return () => {
      URL.revokeObjectURL(url)
      imagemElement.removeAttribute("src")
    }
  }, [imagem, imagemValida, deveExibirImagem])

  return (
    <div className="flex h-64 w-full">
      {!deveExibirImagem && (
        <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-background text-muted-foreground">
          <span className="text-sm">Pré-visualização da foto do produto</span>
        </div>
      )}

      {deveExibirImagem && (
        <img
          ref={imagemRef}
          alt="Pré-visualização da foto do produto"
          className="w-full rounded-lg object-cover"
        />
      )}
    </div>
  )
}
