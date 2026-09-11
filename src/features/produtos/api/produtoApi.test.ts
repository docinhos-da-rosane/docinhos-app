import { beforeEach, describe, expect, it, vi } from "vitest"

import { api } from "@/shared/lib/api.config"

import { cadastrarProduto } from "./produtoApi"

vi.mock("@/shared/lib/api.config", () => ({
  api: {
    post: vi.fn(),
  },
}))

describe(cadastrarProduto.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve cadastrar o produto", async () => {
    const dados = new FormData()
    dados.append("nome", "Brigadeiro")
    dados.append("preco", "5.00")

    vi.mocked(api.post).mockResolvedValue({} as any)

    await expect(cadastrarProduto(dados)).resolves.toBeUndefined()
    expect(api.post).toHaveBeenCalledWith("/produtos", dados)
  })
})
