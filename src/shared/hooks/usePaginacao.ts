import type { Dispatch, SetStateAction } from "react"

interface UsePaginacaoOptions {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalPages: number
  carregando: boolean
  ocorreuErro: boolean
}

interface UsePaginacaoResult {
  paginaAnteriorDesabilitada: boolean
  proximaPaginaDesabilitada: boolean
  navegarParaPaginaAnterior: () => void
  navegarParaProximaPagina: () => void
}

export function usePaginacao({
  page,
  setPage,
  totalPages,
  carregando,
  ocorreuErro,
}: UsePaginacaoOptions): UsePaginacaoResult {
  const paginaAnteriorDesabilitada = carregando || page <= 0 || ocorreuErro
  const proximaPaginaDesabilitada =
    carregando || page + 1 >= totalPages || ocorreuErro

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

  return {
    paginaAnteriorDesabilitada,
    proximaPaginaDesabilitada,
    navegarParaPaginaAnterior,
    navegarParaProximaPagina,
  }
}
