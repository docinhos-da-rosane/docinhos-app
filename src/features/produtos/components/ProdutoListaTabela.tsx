import { ChevronRight } from "lucide-react"
import type { ProdutoResumoResponse } from "../models/produto.types"
import { Link } from "react-router"
import { ProdutoDisponibilidade } from "./ProdutoDisponibilidade"

interface ProdutoListaTabelaProps {
  produtos: ProdutoResumoResponse[]
}

export function ProdutoListaTabela({ produtos }: ProdutoListaTabelaProps) {
  return (
    <table className="w-full table-fixed border-collapse text-center">
      <thead>
        <tr className="sr-only bg-muted/60 text-xs font-semibold tracking-wider text-muted-foreground uppercase md:not-sr-only md:table-row">
          <th className="w-1/4 px-4 py-3" scope="col">
            Foto
          </th>
          <th className="w-1/4 px-4 py-3" scope="col">
            Nome
          </th>
          <th className="w-1/4 px-4 py-3" scope="col">
            Categoria
          </th>
          <th className="w-1/4 px-4 py-3" scope="col">
            Disponibilidade
          </th>
          <th className="w-1/4 px-4 py-3" scope="col">
            Informações
          </th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr
            key={produto.id}
            className="grid grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-x-4 border-b border-border p-4 last:border-b-0 md:table-row md:p-0"
          >
            <td className="row-span-3 md:table-cell md:w-20 md:p-4" scope="row">
              <span className="flex size-16 overflow-hidden rounded-md border border-border bg-muted/60 md:mx-auto md:size-14">
                <img
                  alt={produto.nome}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  src={produto.imagemMiniaturaUrl}
                />
              </span>
            </td>
            <td
              className="col-start-2 row-start-1 justify-self-start text-lg font-semibold wrap-break-word text-foreground md:table-cell md:justify-self-center md:p-4 md:text-base"
              scope="row"
            >
              {produto.nome}
            </td>
            <td className="col-start-2 row-start-3 justify-self-start text-sm wrap-break-word text-muted-foreground md:table-cell md:justify-self-center md:p-4">
              {produto.categoria}
            </td>
            <td className="col-start-3 row-start-1 justify-self-center md:table-cell md:p-4">
              <ProdutoDisponibilidade disponivel={produto.disponivel} />
            </td>
            <td className="col-start-3 row-start-3 text-foreground md:table-cell md:p-4">
              <Link
                to={`/produtos/${produto.id}`}
                className="text-sm font-medium"
              >
                <ChevronRight
                  aria-hidden="true"
                  className="not-sr-only md:sr-only"
                />
                <span className="sr-only md:not-sr-only md:underline">
                  Ver detalhes
                </span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
