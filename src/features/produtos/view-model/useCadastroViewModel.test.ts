import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { PRODUTO_FORM_DATA } from "@/test/mocks/produtoMocks"

import { useCadastroViewModel } from "./useCadastroViewModel"

const mocks = vi.hoisted(() => ({
  mutateAsync: vi.fn(),
  navigate: vi.fn(),
  isPending: false,
}))

vi.mock("react-router-dom", () => ({
  useNavigate: () => mocks.navigate,
}))

vi.mock("../hooks/useCadastrarProduto.ts", () => ({
  useCadastrarProduto: () => ({
    mutateAsync: mocks.mutateAsync,
    isPending: mocks.isPending,
  }),
}))

vi.mock("@/shared/errors/errorService", () => ({
  obterErro: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe(useCadastroViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.isPending = false
  })

  it("deve cadastrar o produto, exibir sucesso e navegar para produtos", async () => {
    mocks.mutateAsync.mockResolvedValue(undefined)

    const { result } = renderHook(() => useCadastroViewModel())

    await act(async () => {
      await result.current.cadastrar(PRODUTO_FORM_DATA)
    })

    expect(mocks.mutateAsync).toHaveBeenCalledWith(expect.any(FormData))
    expect(toast.success).toHaveBeenCalledWith(
      "Produto cadastrado com sucesso!"
    )
    expect(mocks.navigate).toHaveBeenCalledWith(
      ROTAS_COMPLETAS.ADMIN.PRODUTOS,
      { replace: true }
    )
  })

  it("deve exibir erro e navegar para produtos quando o cadastro falhar", async () => {
    const erro = new Error("falha")
    const erroApp = { mensagem: "Não foi possível cadastrar o produto." }

    mocks.mutateAsync.mockRejectedValue(erro)
    vi.mocked(obterErro).mockReturnValue(erroApp as never)

    const { result } = renderHook(() => useCadastroViewModel())

    await act(async () => {
      await result.current.cadastrar(PRODUTO_FORM_DATA)
    })

    expect(obterErro).toHaveBeenCalledWith(erro)
    expect(toast.error).toHaveBeenCalledWith(erroApp.mensagem)
    expect(toast.success).not.toHaveBeenCalled()
    expect(mocks.navigate).toHaveBeenCalledWith(
      ROTAS_COMPLETAS.ADMIN.PRODUTOS,
      { replace: true }
    )
  })

  it("deve retornar o estado de carregamento da mutação", () => {
    mocks.isPending = true

    const { result } = renderHook(() => useCadastroViewModel())

    expect(result.current.carregando).toBe(true)
  })
})
