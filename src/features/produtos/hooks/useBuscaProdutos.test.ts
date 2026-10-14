import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"

import { buscarProdutos } from "../api/produtoApi"
import { useBuscarProdutos } from "./useBuscaProdutos"
import { PAGINA_INICIAL } from "@/test/mocks/produtoMocks"

vi.mock("../api/produtoApi", () => ({
  buscarProdutos: vi.fn(),
}))

describe(useBuscarProdutos.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve buscar a página com sucesso", async () => {
    vi.mocked(buscarProdutos).mockResolvedValue(PAGINA_INICIAL)

    const { result } = renderHook(() => useBuscarProdutos(0), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(buscarProdutos).toHaveBeenCalledWith(0)
    expect(result.current.data).toEqual(PAGINA_INICIAL)
  })

  it("deve expor o erro quando a consulta falhar", async () => {
    const erro = new Error("Falha ao buscar produtos")
    vi.mocked(buscarProdutos).mockRejectedValue(erro)

    const { result } = renderHook(() => useBuscarProdutos(0), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(erro)
  })
})
