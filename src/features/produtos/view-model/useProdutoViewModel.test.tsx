import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { toast } from "sonner"
import { CodeError } from "@/shared/errors/error.enum"
import { montarErroApp } from "@/shared/errors/errorService"
import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import { PRODUTO_DETALHADO } from "@/test/mocks/produtoMocks"
import { useProdutoViewModel } from "./useProdutoViewModel"

const mocks = vi.hoisted(() => ({
  query: {
    data: null as any,
    isLoading: true,
    isError: false,
    error: null as unknown,
  },
  mutateAsync: vi.fn(),
  isPending: false,
  excluirMutateAsync: vi.fn(),
  exclusaoIsPending: false,
}))

vi.mock("../hooks/useBuscaProduto", () => ({
  useBuscaProduto: () => mocks.query,
}))

vi.mock("../hooks/useAlterarDisponibilidadeProduto", () => ({
  useAlterarDisponibilidadeProduto: () => ({
    mutateAsync: mocks.mutateAsync,
    isPending: mocks.isPending,
  }),
}))

vi.mock("../hooks/useExcluirProduto", () => ({
  useExcluirProduto: () => ({
    mutateAsync: mocks.excluirMutateAsync,
    isPending: mocks.exclusaoIsPending,
  }),
}))

vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }))

describe(useProdutoViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.query.data = PRODUTO_DETALHADO
    mocks.query.isLoading = false
    mocks.query.isError = false
    mocks.query.error = null
    mocks.isPending = false
    mocks.exclusaoIsPending = false
    mocks.mutateAsync.mockResolvedValue(undefined)
    mocks.excluirMutateAsync.mockResolvedValue(undefined)
  })

  it("deve retornar os dados vazios enquanto os detalhes carregam", () => {
    mocks.query.data = null
    mocks.query.isLoading = true
    const Wrapper = createQueryMemoryRouterWrapper()

    const { result } = renderHook(() => useProdutoViewModel(), {
      wrapper: Wrapper,
    })

    expect(result.current.carregando).toBe(true)
    expect(result.current.produto.nome).toBe("")
    expect(result.current.acaoDisponibilidade.aberto).toBe(false)
    expect(result.current.acaoExclusao.aberto).toBe(false)
  })

  it.each([
    [true, "Deseja marcar este produto como indisponível?"],
    [false, "Deseja marcar este produto como disponível?"],
  ])(
    "deve abrir e cancelar a confirmação para disponivel=%s",
    (disponivel, texto) => {
      mocks.query.data = { ...PRODUTO_DETALHADO, disponivel }
      const Wrapper = createQueryMemoryRouterWrapper()
      const { result } = renderHook(
        () => useProdutoViewModel(PRODUTO_DETALHADO.id),
        { wrapper: Wrapper }
      )

      act(() => result.current.acaoDisponibilidade.onAbrir())
      expect(result.current.acaoDisponibilidade.aberto).toBe(true)
      expect(result.current.acaoDisponibilidade.texto).toBe(texto)

      act(() => result.current.acaoDisponibilidade.onFechar())
      expect(result.current.acaoDisponibilidade.aberto).toBe(false)
      expect(mocks.mutateAsync).not.toHaveBeenCalled()
    }
  )

  it("deve enviar o estado oposto e confirma sucesso", async () => {
    const Wrapper = createQueryMemoryRouterWrapper()
    const { result } = renderHook(
      () => useProdutoViewModel(PRODUTO_DETALHADO.id),
      { wrapper: Wrapper }
    )

    act(() => result.current.acaoDisponibilidade.onAbrir())
    await act(async () => result.current.acaoDisponibilidade.onConfirmar())

    expect(mocks.mutateAsync).toHaveBeenCalledOnce()
    expect(mocks.mutateAsync).toHaveBeenCalledWith({
      id: PRODUTO_DETALHADO.id,
      disponivel: false,
    })
    expect(toast.success).toHaveBeenCalledWith(
      "Produto atualizado com sucesso!"
    )
    expect(result.current.acaoDisponibilidade.aberto).toBe(false)
  })

  it("deve notificar falha na alteração e preservar os dados carregados", async () => {
    mocks.mutateAsync.mockRejectedValue({
      isAxiosError: true,
      response: {
        data: { codeError: CodeError.ERRO_INTERNO },
      },
    })
    const Wrapper = createQueryMemoryRouterWrapper()
    const { result } = renderHook(
      () => useProdutoViewModel(PRODUTO_DETALHADO.id),
      { wrapper: Wrapper }
    )

    act(() => result.current.acaoDisponibilidade.onAbrir())
    await act(async () => result.current.acaoDisponibilidade.onConfirmar())

    expect(toast.error).toHaveBeenCalledWith(
      montarErroApp(CodeError.ERRO_INTERNO).mensagem
    )
    expect(result.current.produto.disponivel).toBe(PRODUTO_DETALHADO.disponivel)
    expect(result.current.acaoDisponibilidade.aberto).toBe(false)
  })

  it("deve abrir e cancelar exclusão do produto", () => {
    mocks.query.data = PRODUTO_DETALHADO
    const Wrapper = createQueryMemoryRouterWrapper()

    const { result } = renderHook(
      () => useProdutoViewModel(PRODUTO_DETALHADO.id),
      { wrapper: Wrapper }
    )

    act(() => result.current.acaoExclusao.onAbrir())

    expect(result.current.acaoExclusao.aberto).toBe(true)
    expect(result.current.acaoDisponibilidade.aberto).toBe(false)
    expect(result.current.acaoExclusao.texto).toBe(
      "Deseja excluir este produto? Essa ação não poderá ser desfeita."
    )

    act(() => result.current.acaoExclusao.onFechar())

    expect(result.current.acaoExclusao.aberto).toBe(false)
    expect(mocks.excluirMutateAsync).not.toHaveBeenCalled()
  })
})
