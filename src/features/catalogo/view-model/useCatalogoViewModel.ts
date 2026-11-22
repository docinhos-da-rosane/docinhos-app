import { useState } from "react"
import { usePaginacao } from "@/shared/hooks/usePaginacao"
import { useBuscaCatalogoProduto } from "../hooks/useBuscaCatalogoProduto"
import type { CatalogoProdutoResponse } from "../models/catalogo.produto.types"

interface CatalogoViewModelResult {
  page: number
  produtos: CatalogoProdutoResponse[]
  catalogoVazio: boolean
  carregando: boolean
  ocorreuErro: boolean
  paginaAnteriorDesabilitada: boolean
  proximaPaginaDesabilitada: boolean
  navegarParaPaginaAnterior: () => void
  navegarParaProximaPagina: () => void
}

export function useCatalogoViewModel(): CatalogoViewModelResult {
  const [page, setPage] = useState(0)
  const produtosQuery = useBuscaCatalogoProduto(page)

  const carregando = produtosQuery.isPending || produtosQuery.isFetching
  const ocorreuErro = produtosQuery.isError
  const totalElements = produtosQuery.data?.totalElements ?? 0
  const totalPages = produtosQuery.data?.totalPages ?? 0
  const produtos = produtosQuery.data?.content ?? []

  const paginacao = usePaginacao({
    page,
    setPage,
    totalPages,
    carregando,
    ocorreuErro,
  })

  return {
    page,
    produtos,
    catalogoVazio:
      produtosQuery.isSuccess && produtos.length === 0 && totalElements === 0,
    carregando,
    ocorreuErro,
    ...paginacao,
  }
}
