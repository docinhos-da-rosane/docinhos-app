import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { act, renderHook } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { alterarDisponibilidadeProduto } from "../api/produtoApi"
import {
  PAGINA_INICIAL,
  PRODUTO_DETALHADO,
  PRODUTO_ID,
} from "@/test/mocks/produtoMocks"
import { useAlterarDisponibilidadeProduto } from "./useAlterarDisponibilidadeProduto"

vi.mock("../api/produtoApi", () => ({
  alterarDisponibilidadeProduto: vi.fn(),
}))

function criarWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const invalidar = vi.spyOn(queryClient, "invalidateQueries")
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
  return { Wrapper, invalidar, queryClient }
}

describe(useAlterarDisponibilidadeProduto.name, () => {
  beforeEach(() => vi.clearAllMocks())

  it("altera o estado desejado e invalida todas as páginas somente após sucesso", async () => {
    vi.mocked(alterarDisponibilidadeProduto).mockResolvedValue(undefined)

    const { Wrapper, invalidar, queryClient } = criarWrapper()
    queryClient.setQueryData(["produtos", 0], PAGINA_INICIAL)
    queryClient.setQueryData(["produto", PRODUTO_ID], PRODUTO_DETALHADO)

    const { result } = renderHook(() => useAlterarDisponibilidadeProduto(), {
      wrapper: Wrapper,
    })

    await act(() =>
      result.current.mutateAsync({ id: PRODUTO_ID, disponivel: false })
    )

    expect(alterarDisponibilidadeProduto).toHaveBeenCalledWith(
      PRODUTO_ID,
      false
    )
    expect(invalidar).toHaveBeenCalledTimes(2)
    expect(invalidar).toHaveBeenNthCalledWith(1, {
      queryKey: ["produto", PRODUTO_ID],
      exact: true,
      refetchType: "all",
    })
    expect(invalidar).toHaveBeenNthCalledWith(2, { queryKey: ["produtos"] })
    expect(
      queryClient.getQueryState(["produto", PRODUTO_ID])?.isInvalidated
    ).toBe(true)
    expect(queryClient.getQueryState(["produtos", 0])?.isInvalidated).toBe(true)
  })

  it("não invalida a listagem quando o PATCH falha", async () => {
    vi.mocked(alterarDisponibilidadeProduto).mockRejectedValue(
      new Error("Falha")
    )
    const { Wrapper, invalidar } = criarWrapper()
    const { result } = renderHook(() => useAlterarDisponibilidadeProduto(), {
      wrapper: Wrapper,
    })

    await expect(
      act(() =>
        result.current.mutateAsync({ id: PRODUTO_ID, disponivel: true })
      )
    ).rejects.toThrow("Falha")
    expect(invalidar).not.toHaveBeenCalled()
  })
})
