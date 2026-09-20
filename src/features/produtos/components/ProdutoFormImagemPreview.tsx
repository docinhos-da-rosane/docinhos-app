import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import type { ProdutoFormData } from "../schemas/produto.schema"

interface ProdutoFormImagemPreviewProps {
  imagemValida: boolean
}

export function ProdutoFormImagemPreview({
  imagemValida,
}: ProdutoFormImagemPreviewProps) {
  const { watch } = useFormContext<ProdutoFormData>()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const imagem = watch("imagem")

  useEffect(() => {
    if (!imagem || !imagemValida) {
      setPreviewUrl(undefined)
      return
    }

    const url = URL.createObjectURL(imagem)
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [imagem])

  return (
    <div className="flex h-64 w-full">
      {!previewUrl && (
        <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-background text-muted-foreground">
          <span className="text-sm">Pré-visualização da foto do produto</span>
        </div>
      )}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Pré-visualização da foto do produto"
          className="w-full rounded-lg object-cover"
        />
      )}
    </div>
  )
}
