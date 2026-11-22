import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import {
  CATALOGO_PAGINA_FINAL,
  CATALOGO_PAGINA_INICIAL,
} from "@/test/mocks/catalogoMocks"
import { buscarProdutosPublicos } from "../api/produtoPublicoApi"
import { useCatalogoViewModel } from "./useCatalogoViewModel"

vi.mock("../api/produtoPublicoApi", () => ({
  buscarProdutosPublicos: vi.fn(),
  TAMANHO_PAGINA_CATALOGO: 6,
}))

describe(useCatalogoViewModel.name, () => {
  beforeEach(() => vi.clearAllMocks())

  it("deve navegar entre as páginas", async () => {
    vi.mocked(buscarProdutosPublicos).mockImplementation(async (page) =>
      page === 0 ? CATALOGO_PAGINA_INICIAL : CATALOGO_PAGINA_FINAL
    )

    const { result } = renderHook(() => useCatalogoViewModel(), {
      wrapper: createQueryMemoryRouterWrapper(),
    })

    expect(result.current.carregando).toBe(true)
    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    await waitFor(() => expect(result.current.carregando).toBe(false))
    expect(result.current.page).toBe(0)
    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(false)
    expect(result.current.produtos).toEqual(CATALOGO_PAGINA_INICIAL.content)

    act(() => result.current.navegarParaProximaPagina())
    await waitFor(() => {
      expect(result.current.page).toBe(1)
      expect(result.current.produtos).toEqual(CATALOGO_PAGINA_FINAL.content)
    })
    expect(result.current.paginaAnteriorDesabilitada).toBe(false)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    act(() => result.current.navegarParaPaginaAnterior())
    await waitFor(() => expect(result.current.page).toBe(0))
    expect(buscarProdutosPublicos).toHaveBeenCalledTimes(3)
  })

  it("deve bloquear a navegação quando a consulta da página falha", async () => {
    vi.mocked(buscarProdutosPublicos).mockImplementation(async (page) => {
      if (page === 0) return CATALOGO_PAGINA_INICIAL
      throw new Error("Falha temporária")
    })

    const { result } = renderHook(() => useCatalogoViewModel(), {
      wrapper: createQueryMemoryRouterWrapper(),
    })

    await waitFor(() => expect(result.current.carregando).toBe(false))
    act(() => result.current.navegarParaProximaPagina())
    await waitFor(() => expect(result.current.ocorreuErro).toBe(true))
    expect(result.current.page).toBe(1)
    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    expect(buscarProdutosPublicos).toHaveBeenNthCalledWith(2, 1, 6)
  })
})
