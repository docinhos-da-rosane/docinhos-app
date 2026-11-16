import { useEffect, useState } from "react"
import { toast } from "sonner"
import { obterErro } from "@/shared/errors/errorService"
import { usePaginacao } from "@/shared/hooks/usePaginacao"
import { useBuscarProdutos } from "../hooks/useBuscaProdutos"
import type { ProdutoResumoResponse } from "../models/produto.types"

interface ProdutoListaViewModelResult {
  page: number
  produtos: ProdutoResumoResponse[]
  possuiProdutos: boolean
  carregando: boolean
  ocorreuErro: boolean
  paginaAnteriorDesabilitada: boolean
  proximaPaginaDesabilitada: boolean
  navegarParaPaginaAnterior: () => void
  navegarParaProximaPagina: () => void
}

export function useProdutoListaViewModel(): ProdutoListaViewModelResult {
  const [page, setPage] = useState(0)
  const produtosQuery = useBuscarProdutos(page)

  const carregando = produtosQuery.isFetching
  const ocorreuErro = produtosQuery.isError

  const totalElements = produtosQuery.data?.totalElements ?? 0
  const totalPages = produtosQuery.data?.totalPages ?? 0

  const possuiProdutos = totalElements > 0
  const paginacao = usePaginacao({
    page,
    setPage,
    totalPages,
    carregando,
    ocorreuErro,
  })

  useEffect(() => {
    if (!produtosQuery.isError) {
      return
    }

    const erroApp = obterErro(produtosQuery.error)
    toast.error(erroApp.mensagem)
  }, [produtosQuery.error, produtosQuery.isError])

  return {
    page,
    produtos: produtosQuery.data?.content ?? [],
    possuiProdutos,
    carregando,
    ocorreuErro,
    ...paginacao,
  }
}
