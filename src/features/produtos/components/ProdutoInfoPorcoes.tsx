import { Painel } from "@/shared/components"
import type { PorcaoResponse } from "../models/produto.types"

interface ProdutoInfoPorcoesProps {
  porcoes: PorcaoResponse[]
}

const formatadorPreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function ProdutoInfoPorcoes({ porcoes }: ProdutoInfoPorcoesProps) {
  return (
    <Painel className="min-h-full">
      <h2 className="mb-4 text-xl font-bold lg:text-2xl">Porções e Preços</h2>
      <ul className="divide-y divide-border px-4">
        {porcoes.map((porcao, index) => (
          <li
            key={`${porcao.quantidade}-${index}`}
            className="flex items-center justify-between gap-4 py-4 text-sm text-foreground"
          >
            <span>
              {porcao.quantidade}{" "}
              {porcao.quantidade === 1 ? "unidade" : "unidades"}
            </span>
            <span className="font-semibold tabular-nums">
              {formatadorPreco.format(porcao.preco)}
            </span>
          </li>
        ))}
      </ul>
    </Painel>
  )
}
