import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { act, renderHook } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { excluirProduto } from "../api/produtoApi"
import {
  PAGINA_INICIAL,
  PRODUTO_DETALHADO,
  PRODUTO_ID,
} from "@/test/mocks/produtoMocks"
import { useExcluirProduto } from "./useExcluirProduto"

vi.mock("../api/produtoApi", () => ({
  excluirProduto: vi.fn(),
}))

function criarWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  return { Wrapper, queryClient }
}

describe(useExcluirProduto.name, () => {
  beforeEach(() => vi.clearAllMocks())

  it("deve remover os detalhes e todas as páginas após sucesso", async () => {
    const outraPagina = { ...PAGINA_INICIAL, page: 1 }

    vi.mocked(excluirProduto).mockResolvedValue(undefined)

    const { Wrapper, queryClient } = criarWrapper()

    queryClient.setQueryData(["produto", PRODUTO_ID], PRODUTO_DETALHADO)
    queryClient.setQueryData(["produto", "outro-produto"], PRODUTO_DETALHADO)
    queryClient.setQueryData(["produtos", 0], PAGINA_INICIAL)
    queryClient.setQueryData(["produtos", 1], outraPagina)

    const { result } = renderHook(() => useExcluirProduto(), {
      wrapper: Wrapper,
    })

    await act(() => result.current.mutateAsync(PRODUTO_ID))

    expect(excluirProduto).toHaveBeenCalledWith(PRODUTO_ID)
    expect(queryClient.getQueryData(["produto", PRODUTO_ID])).toBeUndefined()
    expect(queryClient.getQueryData(["produto", "outro-produto"])).toEqual(
      PRODUTO_DETALHADO
    )
    expect(queryClient.getQueryData(["produtos", 0])).toBeUndefined()
    expect(queryClient.getQueryData(["produtos", 1])).toBeUndefined()
  })

  it("deve remover os dados quando a API retorna 404", async () => {
    const erro = {
      isAxiosError: true,
      response: {
        status: 404,
        data: { codeError: "NAO_ENCONTRADO" },
      },
    }

    vi.mocked(excluirProduto).mockRejectedValue(erro)

    const { Wrapper, queryClient } = criarWrapper()

    queryClient.setQueryData(["produto", PRODUTO_ID], PRODUTO_DETALHADO)
    queryClient.setQueryData(["produtos", 0], PAGINA_INICIAL)

    const { result } = renderHook(() => useExcluirProduto(), {
      wrapper: Wrapper,
    })

    await act(() =>
      expect(result.current.mutateAsync(PRODUTO_ID)).rejects.toBeDefined()
    )

    expect(queryClient.getQueryData(["produto", PRODUTO_ID])).toBeUndefined()
    expect(queryClient.getQueryData(["produtos", 0])).toBeUndefined()
  })

  it("deve preservar caches quando a exclusão falha por outro motivo", async () => {
    vi.mocked(excluirProduto).mockRejectedValue(new Error("Falha de rede"))

    const { Wrapper, queryClient } = criarWrapper()

    queryClient.setQueryData(["produto", PRODUTO_ID], PRODUTO_DETALHADO)
    queryClient.setQueryData(["produtos", 0], PAGINA_INICIAL)

    const { result } = renderHook(() => useExcluirProduto(), {
      wrapper: Wrapper,
    })

    await act(() =>
      expect(result.current.mutateAsync(PRODUTO_ID)).rejects.toThrow()
    )

    expect(queryClient.getQueryData(["produto", PRODUTO_ID])).toEqual(
      PRODUTO_DETALHADO
    )
    expect(queryClient.getQueryData(["produtos", 0])).toEqual(PAGINA_INICIAL)
  })
})
