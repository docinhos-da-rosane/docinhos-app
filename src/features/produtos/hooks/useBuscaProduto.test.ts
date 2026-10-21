import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"
import { buscarProduto } from "../api/produtoApi"
import { useBuscaProduto } from "./useBuscaProduto"
import { PRODUTO_DETALHADO } from "@/test/mocks/produtoMocks"

vi.mock("../api/produtoApi", () => ({
  buscarProduto: vi.fn(),
}))

describe(useBuscaProduto.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve consultar os dados para a partir do id", async () => {
    vi.mocked(buscarProduto).mockImplementation(async () => PRODUTO_DETALHADO)

    const resultado = renderHook(() => useBuscaProduto(PRODUTO_DETALHADO.id), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(resultado.result.current.isSuccess).toBe(true)
    })

    expect(buscarProduto).toHaveBeenCalledWith(PRODUTO_DETALHADO.id)
    expect(resultado.result.current.data?.id).toBe(PRODUTO_DETALHADO.id)
  })
})
