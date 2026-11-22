import { formatadorPreco } from "@/shared/lib/formatadores"
import type { CatalogoProdutoResponse } from "../models/catalogo.produto.types"
import { CustomButton } from "@/shared/components"
import { Ban } from "lucide-react"

interface CatalogoCardProps {
  produto: CatalogoProdutoResponse
}

export function CatalogoCard({ produto }: CatalogoCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-card shadow-sm">
      <div className="relative aspect-video overflow-hidden rounded-b-2xl border-b-2 border-border bg-muted">
        <img
          alt={produto.nome}
          className="block size-full object-cover"
          src={produto.imagemMenorUrl}
        />
        {!produto.disponivel && (
          <div className="p-4text-center absolute inset-0 flex items-center justify-center bg-secondary/70 text-[12px] font-medium">
            <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-secondary/70 bg-white px-3 py-1.5 font-mono text-muted-foreground uppercase shadow-sm">
              <Ban size={12} />
              <span className="leading-none">Indisponível no momento</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="line-clamp-2 font-sans text-lg font-bold text-card-foreground">
            {produto.nome}
          </h2>
          <p className="font-mono text-[12px] text-secondary uppercase">
            {produto.categoria}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[12px] text-card-foreground">
            A partir de {formatadorPreco.format(produto.porcaoMenorPreco.preco)}{" "}
            ({produto.porcaoMenorPreco.quantidade} unidades)
          </p>
          <CustomButton
            variant="outline-secondary"
            className="text-md mt-auto w-full py-2 font-medium"
            disabled={!produto.disponivel}
          >
            {produto.disponivel ? "Ver Detalhes" : "Indisponível"}
          </CustomButton>
        </div>
      </div>
    </article>
  )
}
