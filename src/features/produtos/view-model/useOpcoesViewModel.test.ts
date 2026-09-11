import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { CATEGORIAS, CATEGORIAS_OPCOES } from "@/test/mocks/categoriaMocks"

import { useOpcoesViewModel } from "./useOpcoesViewModel"

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  query: {
    data: undefined as typeof CATEGORIAS | undefined,
    isLoading: false,
    isError: false,
    error: undefined as unknown,
  },
}))

vi.mock("react-router-dom", () => ({
  useNavigate: () => mocks.navigate,
}))

vi.mock("../hooks/useBuscaCategorias.ts", () => ({
  useBuscarCategorias: () => mocks.query,
}))

vi.mock("@/shared/errors/errorService", () => ({
  obterErro: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe(useOpcoesViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mocks.query = {
      data: undefined as typeof CATEGORIAS | undefined,
      isLoading: false,
      isError: false,
      error: undefined as unknown,
    }
  })

  it("deve mapear as categorias para opções", () => {
    mocks.query.data = CATEGORIAS

    const { result } = renderHook(() => useOpcoesViewModel())

    expect(result.current.categoriasOpcoes).toEqual(CATEGORIAS_OPCOES)
    expect(result.current.carregando).toBe(false)
  })

  it("deve retornar uma lista vazia quando não houver categorias", () => {
    const { result } = renderHook(() => useOpcoesViewModel())

    expect(result.current.categoriasOpcoes).toEqual([])
  })

  it("deve retornar o estado de carregamento da consulta", () => {
    mocks.query.isLoading = true

    const { result } = renderHook(() => useOpcoesViewModel())

    expect(result.current.carregando).toBe(true)
  })

  it("deve exibir erro e navegar para produtos quando a consulta falhar", () => {
    const erro = new Error("falha")
    const erroApp = { mensagem: "Não foi possível carregar as categorias." }

    mocks.query.isError = true
    mocks.query.error = erro
    vi.mocked(obterErro).mockReturnValue(erroApp as never)

    renderHook(() => useOpcoesViewModel())

    expect(obterErro).toHaveBeenCalledWith(erro)
    expect(toast.error).toHaveBeenCalledWith(erroApp.mensagem)
    expect(mocks.navigate).toHaveBeenCalledWith(
      ROTAS_COMPLETAS.ADMIN.PRODUTOS,
      { replace: true }
    )
  })

  it("não deve exibir erro nem navegar quando a consulta for bem-sucedida", () => {
    mocks.query.data = CATEGORIAS

    renderHook(() => useOpcoesViewModel())

    expect(toast.error).not.toHaveBeenCalled()
    expect(mocks.navigate).not.toHaveBeenCalled()
  })
})
