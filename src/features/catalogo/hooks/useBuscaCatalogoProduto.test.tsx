import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"
import { CATALOGO_PAGINA_INICIAL } from "@/test/mocks/catalogoMocks"
import { buscarProdutosPublicos } from "../api/produtoPublicoApi"
import { useBuscaCatalogoProduto } from "./useBuscaCatalogoProduto"

vi.mock("../api/produtoPublicoApi", () => ({
  buscarProdutosPublicos: vi.fn(),
  TAMANHO_PAGINA_CATALOGO: 6,
}))

describe(useBuscaCatalogoProduto.name, () => {
  beforeEach(() => vi.clearAllMocks())

  it("deve buscar e retornar a página solicitada", async () => {
    vi.mocked(buscarProdutosPublicos).mockResolvedValue(CATALOGO_PAGINA_INICIAL)

    const { result } = renderHook(() => useBuscaCatalogoProduto(0), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(buscarProdutosPublicos).toHaveBeenCalledWith(0, 6)
    expect(result.current.data).toEqual(CATALOGO_PAGINA_INICIAL)
  })

  it("deve expôr falhas da consulta", async () => {
    const erro = new Error("Falha ao consultar catálogo")
    vi.mocked(buscarProdutosPublicos).mockRejectedValue(erro)

    const { result } = renderHook(() => useBuscaCatalogoProduto(0), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toEqual(erro)
  })
})
