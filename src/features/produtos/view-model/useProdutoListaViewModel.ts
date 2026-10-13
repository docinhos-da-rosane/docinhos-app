import { useEffect, useState } from "react"
import { toast } from "sonner"
import { obterErro } from "@/shared/errors/errorService"
import { useBuscarProdutos } from "../hooks/useBuscaProdutos"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
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
  navegarParaCadastro: () => void
}

export function useProdutoListaViewModel(): ProdutoListaViewModelResult {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const produtosQuery = useBuscarProdutos(page)

  const carregando = produtosQuery.isFetching
  const ocorreuErro = produtosQuery.isError

  const totalElements = produtosQuery.data?.totalElements ?? 0
  const totalPages = produtosQuery.data?.totalPages ?? 0

  const possuiProdutos = totalElements > 0
  const paginaAnteriorDesabilitada = carregando || page <= 0 || ocorreuErro
  const proximaPaginaDesabilitada =
    carregando || page + 1 >= totalPages || ocorreuErro

  useEffect(() => {
    if (!produtosQuery.isError) {
      return
    }

    const erroApp = obterErro(produtosQuery.error)
    toast.error(erroApp.mensagem)
  }, [produtosQuery.error, produtosQuery.isError])

  function navegarParaPaginaAnterior() {
    if (paginaAnteriorDesabilitada) {
      return
    }

    setPage((paginaAtual) => paginaAtual - 1)
  }

  function navegarParaProximaPagina() {
    if (proximaPaginaDesabilitada) {
      return
    }

    setPage((paginaAtual) => paginaAtual + 1)
  }

  function navegarParaCadastro() {
    navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS_CADASTRO)
  }

  return {
    page,
    produtos: produtosQuery.data?.content ?? [],
    possuiProdutos,
    carregando,
    ocorreuErro,
    paginaAnteriorDesabilitada,
    proximaPaginaDesabilitada,
    navegarParaPaginaAnterior,
    navegarParaProximaPagina,
    navegarParaCadastro,
  }
}
