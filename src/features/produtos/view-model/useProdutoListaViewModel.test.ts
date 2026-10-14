import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"

import { buscarProdutos } from "../api/produtoApi"
import type {
  PageResponse,
  ProdutoResumoResponse,
} from "../models/produto.types"
import { useProdutoListaViewModel } from "./useProdutoListaViewModel"
import { PAGINA_INICIAL } from "@/test/mocks/produtoMocks"

vi.mock("../api/produtoApi", () => ({
  buscarProdutos: vi.fn(),
  TAMANHO_PAGINA_PRODUTOS: 6,
}))

vi.mock("@/shared/errors/errorService", () => ({
  obterErro: vi.fn(() => ({ mensagem: "Mensagem de erro" })),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}))

const segundaPagina: PageResponse<ProdutoResumoResponse> = {
  ...PAGINA_INICIAL,
  content: [
    {
      ...PAGINA_INICIAL.content[0],
      id: "produto-7",
      nome: "Trufa",
    },
  ],
  page: 1,
}

describe(useProdutoListaViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve navegar somente entre as páginas informadas pela API", async () => {
    vi.mocked(buscarProdutos).mockImplementation(async (page) =>
      page === 0 ? PAGINA_INICIAL : segundaPagina
    )

    const { result } = renderHook(() => useProdutoListaViewModel(), {
      wrapper: createQueryMemoryRouterWrapper(),
    })

    await waitFor(() => {
      expect(result.current.carregando).toBe(false)
    })

    expect(result.current.page).toBe(0)
    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(false)

    act(() => result.current.navegarParaProximaPagina())

    await waitFor(() => {
      expect(result.current.page).toBe(1)
      expect(result.current.produtos).toEqual(segundaPagina.content)
    })

    expect(result.current.paginaAnteriorDesabilitada).toBe(false)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    act(() => result.current.navegarParaPaginaAnterior())

    await waitFor(() => {
      expect(result.current.page).toBe(0)
      expect(result.current.produtos).toEqual(PAGINA_INICIAL.content)
    })

    expect(buscarProdutos).toHaveBeenCalledTimes(3)
  })

  it("deve desabilitar as duas direções sem produtos ou com uma página", async () => {
    vi.mocked(buscarProdutos).mockResolvedValue({
      content: [],
      page: 0,
      size: 6,
      totalElements: 0,
      totalPages: 0,
    })

    const { result } = renderHook(() => useProdutoListaViewModel(), {
      wrapper: createQueryMemoryRouterWrapper(),
    })

    await waitFor(() => {
      expect(result.current.carregando).toBe(false)
    })

    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    vi.mocked(buscarProdutos).mockResolvedValue({
      ...PAGINA_INICIAL,
      totalElements: 3,
      totalPages: 1,
    })

    const { result: paginaUnica } = renderHook(
      () => useProdutoListaViewModel(),
      { wrapper: createQueryMemoryRouterWrapper() }
    )

    await waitFor(() => {
      expect(paginaUnica.current.carregando).toBe(false)
    })

    expect(buscarProdutos).toHaveBeenCalledTimes(2)
    expect(paginaUnica.current.paginaAnteriorDesabilitada).toBe(true)
    expect(paginaUnica.current.proximaPaginaDesabilitada).toBe(true)
  })

  it("deve mapear e notificar a falha", async () => {
    const erro = new Error("Falha ao buscar produtos")
    vi.mocked(buscarProdutos).mockRejectedValue(erro)

    const { result, rerender } = renderHook(() => useProdutoListaViewModel(), {
      wrapper: createQueryMemoryRouterWrapper(),
    })

    await waitFor(() => {
      expect(result.current.ocorreuErro).toBe(true)
    })

    expect(obterErro).toHaveBeenCalledWith(erro)
    expect(toast.error).toHaveBeenCalledWith("Mensagem de erro")

    rerender()

    expect(toast.error).toHaveBeenCalledTimes(1)
  })
})
