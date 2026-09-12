import { beforeEach, describe, expect, it, vi } from "vitest"

import { apiProtegida } from "@/shared/lib/api.config"

import { cadastrarProduto } from "./produtoApi"

vi.mock("@/shared/lib/api.config", () => ({
  apiProtegida: {
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

    vi.mocked(apiProtegida.post).mockResolvedValue({} as any)

    await expect(cadastrarProduto(dados)).resolves.toBeUndefined()
    expect(apiProtegida.post).toHaveBeenCalledWith("/produtos", dados)
  })
})
