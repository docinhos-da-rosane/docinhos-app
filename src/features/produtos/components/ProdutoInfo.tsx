import { Painel } from "@/shared/components"
import type { ProdutoDetalhadoResponse } from "../models/produto.types"
import { ProdutoInfoAcoes } from "./ProdutoInfoAcoes"
import { ProdutoInfoPorcoes } from "./ProdutoInfoPorcoes"

interface ProdutoInfoProps {
  produto: ProdutoDetalhadoResponse
}

export function ProdutoInfo({ produto }: ProdutoInfoProps) {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-muted/50 lg:col-start-1 lg:row-start-1">
        <img
          alt={produto.nome}
          className="h-full w-full object-cover object-center"
          src={produto.imagemUrl}
          loading="lazy"
        />
      </div>

      <div className="contents lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <Painel className="min-h-full">
          <h2 className="mb-4 text-xl font-bold lg:text-2xl">
            Informações do produto
          </h2>
          <div className="divide-y divide-border rounded-xl px-4 text-sm text-foreground">
            <div className="py-4">
              <h3 className="mb-2 font-sans font-medium tracking-widest text-muted-foreground uppercase">
                Descrição
              </h3>
              <p className="wrap-break-words">{produto.descricao}</p>
            </div>
            <div className="py-4">
              <h3 className="mb-2 font-sans font-medium tracking-widest text-muted-foreground uppercase">
                Categoria
              </h3>
              <p className="wrap-break-words">{produto.categoria}</p>
            </div>

            <div className="py-4">
              <h3 className="mb-2 font-sans font-medium tracking-widest text-muted-foreground uppercase">
                Disponibilidade
              </h3>
              <p>{produto.disponivel ? "Disponível" : "Indisponível"}</p>
            </div>
          </div>
        </Painel>

        <ProdutoInfoPorcoes porcoes={produto.porcoes} />
      </div>

      <ProdutoInfoAcoes disponivel={produto.disponivel} />
    </div>
  )
}
