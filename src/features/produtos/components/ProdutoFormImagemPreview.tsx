import { useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"
import type { ProdutoFormValues } from "../schemas/produto.schema"

interface ProdutoFormImagemPreviewProps {
  imagemValida: boolean
  imagemUrl?: string
}

export function ProdutoFormImagemPreview({
  imagemValida,
  imagemUrl,
}: ProdutoFormImagemPreviewProps) {
  const { watch } = useFormContext<ProdutoFormValues>()
  const imagemRef = useRef<HTMLImageElement>(null)
  const imagem = watch("imagem")
  const deveExibirArquivo = Boolean(imagem && imagemValida)
  const deveExibirImagem = deveExibirArquivo || Boolean(imagemUrl)

  useEffect(() => {
    const imagemElement = imagemRef.current
    if (!imagemElement) return

    if (deveExibirArquivo && imagem) {
      const url = URL.createObjectURL(imagem)

      imagemElement.src = url

      return () => {
        URL.revokeObjectURL(url)
        imagemElement.removeAttribute("src")
      }
    }

    if (imagemUrl) {
      imagemElement.src = imagemUrl

      return () => {
        imagemElement.removeAttribute("src")
      }
    }
  }, [imagem, imagemValida, imagemUrl, deveExibirArquivo])

  return (
    <div className="flex h-64 w-full md:h-86">
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
