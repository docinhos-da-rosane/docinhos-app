import type { CatalogoProdutoResponse } from "../models/catalogo.produto.types"
import { CatalogoCard } from "./CatalogoCard"

interface CatalogoListaProps {
  produtos: CatalogoProdutoResponse[]
}

export function CatalogoLista({ produtos }: CatalogoListaProps) {
  return (
    <ul className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
      {produtos.map((produto) => (
        <li key={produto.id}>
          <CatalogoCard produto={produto} />
        </li>
      ))}
    </ul>
  )
}
