import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"
import { CodeError } from "@/shared/errors/error.enum"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { PRODUTO_DETALHADO, PRODUTO_ID } from "@/test/mocks/produtoMocks"
import { useEdicaoViewModel } from "./useEdicaoViewModel"

const mocks = vi.hoisted(() => ({
  buscarProduto: vi.fn(),
  atualizarProduto: vi.fn(),
  navigate: vi.fn(),
}))

vi.mock("../api/produtoApi", () => ({
  buscarProduto: mocks.buscarProduto,
  atualizarProduto: mocks.atualizarProduto,
}))

vi.mock("react-router-dom", () => ({
  useNavigate: () => mocks.navigate,
}))

vi.mock("@/shared/errors/errorService", () => ({
  obterErro: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe(useEdicaoViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve carregar os dados do produto e os disponibilizar no formulário", async () => {
    mocks.buscarProduto.mockResolvedValue(PRODUTO_DETALHADO)

    const { result } = renderHook(() => useEdicaoViewModel(PRODUTO_ID), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.methods.getValues("nome")).toBe(
        PRODUTO_DETALHADO.nome
      )
    })

    expect(result.current.methods.getValues()).toEqual({
      nome: PRODUTO_DETALHADO.nome,
      descricao: PRODUTO_DETALHADO.descricao,
      categoriaId: PRODUTO_DETALHADO.categoria.id,
      imagem: undefined,
      porcoes: PRODUTO_DETALHADO.porcoes.map((porcao) => ({
        quantidade: String(porcao.quantidade),
        preco: String(porcao.preco),
      })),
    })
    expect(result.current.imagemUrl).toBe(PRODUTO_DETALHADO.imagemUrl)
    expect(result.current.carregando).toBe(false)
  })

  it("deve atualizar o produto, exibir sucesso e navegar para os detalhes", async () => {
    mocks.buscarProduto.mockResolvedValue(PRODUTO_DETALHADO)
    mocks.atualizarProduto.mockResolvedValue(undefined)

    const { result } = renderHook(() => useEdicaoViewModel(PRODUTO_ID), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.methods.getValues("nome")).toBe(
        PRODUTO_DETALHADO.nome
      )
    })

    await act(async () => {
      await result.current.atualizar({
        nome: "Brigadeiro atualizado",
        descricao: PRODUTO_DETALHADO.descricao,
        categoriaId: PRODUTO_DETALHADO.categoria.id,
        porcoes: [{ quantidade: "10", preco: "5,50" }],
      })
    })

    expect(mocks.atualizarProduto).toHaveBeenCalledWith(
      PRODUTO_ID,
      expect.any(FormData)
    )
    expect(toast.success).toHaveBeenCalledWith(
      "Produto atualizado com sucesso!"
    )
    expect(mocks.navigate).toHaveBeenCalledWith(
      ROTAS_COMPLETAS.ADMIN.PRODUTO_DETALHES(PRODUTO_ID),
      { replace: true }
    )
  })

  it("deve notificar e redirecionar quando o produto não é encontrado", async () => {
    const erro = new Error("Produto inexistente")
    mocks.buscarProduto.mockRejectedValue(erro)
    vi.mocked(obterErro).mockReturnValue({
      codeError: CodeError.NAO_ENCONTRADO,
      mensagem: "Produto não encontrado.",
    } as never)

    renderHook(() => useEdicaoViewModel(PRODUTO_ID), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith(
        ROTAS_COMPLETAS.ADMIN.PRODUTOS,
        { replace: true }
      )
    })

    expect(toast.error).toHaveBeenCalledWith("Produto não encontrado.")
  })
})
