import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"

import { useCadastrarProduto } from "./useCadastrarProduto"

const mocks = vi.hoisted(() => ({
  cadastrarProduto: vi.fn(),
}))

vi.mock("../api/produtoApi", () => ({
  cadastrarProduto: mocks.cadastrarProduto,
}))

describe(useCadastrarProduto.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve cadastrar o produto com sucesso", async () => {
    const dados = new FormData()
    dados.append("nome", "Brigadeiro")

    mocks.cadastrarProduto.mockResolvedValue(undefined)

    const { result } = renderHook(() => useCadastrarProduto(), {
      wrapper: createQueryWrapper(),
    })

    await expect(result.current.mutateAsync(dados)).resolves.toBeUndefined()

    expect(mocks.cadastrarProduto).toHaveBeenCalledTimes(1)
    expect(mocks.cadastrarProduto.mock.calls[0][0]).toEqual(dados)
  })

  it("deve propagar o erro quando o cadastro falhar", async () => {
    const mensagemErro = "Falha ao cadastrar produto"
    const erro = new Error(mensagemErro)
    const dados = new FormData()

    mocks.cadastrarProduto.mockRejectedValue(erro)

    const { result } = renderHook(() => useCadastrarProduto(), {
      wrapper: createQueryWrapper(),
    })

    await expect(result.current.mutateAsync(dados)).rejects.toThrow(
      mensagemErro
    )
  })
})
