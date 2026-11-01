import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, act } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { useEditarProduto } from "./useEditarProduto"
import { PRODUTO_ID } from "@/test/mocks/produtoMocks"

const mocks = vi.hoisted(() => ({
  atualizarProduto: vi.fn(),
}))

vi.mock("../api/produtoApi", () => ({
  atualizarProduto: mocks.atualizarProduto,
}))

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  const invalidateQueries = vi
    .spyOn(queryClient, "invalidateQueries")
    .mockResolvedValue()

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  return { Wrapper, invalidateQueries }
}

describe(useEditarProduto.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve atualiza ro produto e invalidar os caches de detalhe e listagem", async () => {
    const dados = new FormData()
    dados.append("produto", "produto atualizado")
    mocks.atualizarProduto.mockResolvedValue(undefined)
    const { Wrapper, invalidateQueries } = createWrapper()

    const { result } = renderHook(() => useEditarProduto(), {
      wrapper: Wrapper,
    })

    await act(async () => {
      await result.current.mutateAsync({ id: PRODUTO_ID, data: dados })
    })

    expect(mocks.atualizarProduto).toHaveBeenCalledWith(PRODUTO_ID, dados)
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["produto", PRODUTO_ID],
      exact: true,
      refetchType: "all",
    })
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["produtos"],
    })
  })

  it("deve propagar erro da API e mantém os caches sem invalidação", async () => {
    const erro = new Error("Falha ao atualizar produto")
    mocks.atualizarProduto.mockRejectedValue(erro)
    const { Wrapper, invalidateQueries } = createWrapper()

    const { result } = renderHook(() => useEditarProduto(), {
      wrapper: Wrapper,
    })

    await expect(
      act(async () =>
        result.current.mutateAsync({ id: PRODUTO_ID, data: new FormData() })
      )
    ).rejects.toThrow(erro.message)

    expect(invalidateQueries).not.toHaveBeenCalled()
  })
})
