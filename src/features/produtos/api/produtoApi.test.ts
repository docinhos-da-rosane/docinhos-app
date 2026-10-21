import { beforeEach, describe, expect, it, vi } from "vitest"

import { apiProtegida } from "@/shared/lib/api.config"

import {
  buscarProduto,
  buscarProdutos,
  cadastrarProduto,
  TAMANHO_PAGINA_PRODUTOS,
} from "./produtoApi"
import type {
  PageResponse,
  ProdutoResumoResponse,
} from "../models/produto.types"
import { PRODUTO_DETALHADO } from "@/test/mocks/produtoMocks"

vi.mock("@/shared/lib/api.config", () => ({
  apiProtegida: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

const PRODUTOS: ProdutoResumoResponse[] = [
  {
    id: "8d30caae-c7cf-48a0-9cf9-953f10777cda",
    nome: "Brigadeiro",
    categoria: "Tradicionais",
    imagemMiniaturaUrl: "https://examplo.com/brigadeiro-miniatura.jpg",
    disponivel: true,
  },
  {
    id: "94f69828-62a7-4009-bf80-31dd8f4445e7",
    nome: "Beijinho",
    categoria: "Tradicionais",
    imagemMiniaturaUrl: "https://examplo.com/beijinho-miniatura.jpg",
    disponivel: true,
  },
]

const PAGINA: PageResponse<ProdutoResumoResponse> = {
  content: PRODUTOS,
  page: 0,
  size: TAMANHO_PAGINA_PRODUTOS,
  totalElements: PRODUTOS.length,
  totalPages: 1,
}

describe("produtoApi", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve buscar produtos com sucesso", async () => {
    vi.mocked(apiProtegida.get).mockResolvedValue({ data: PAGINA } as any)

    const resposta = await buscarProdutos(0)

    expect(resposta).toEqual(PAGINA)
    expect(resposta.content).toEqual(PRODUTOS)

    expect(apiProtegida.get).toHaveBeenCalledWith("/produtos", {
      params: { page: 0, size: 6 },
    })
    expect(apiProtegida.get).toHaveBeenCalledTimes(1)
  })

  it("deve consultar uma página solicitada mantendo o tamanho fixo", async () => {
    vi.mocked(apiProtegida.get).mockResolvedValue({ data: PAGINA } as any)

    await buscarProdutos(2)

    expect(apiProtegida.get).toHaveBeenCalledWith("/produtos", {
      params: { page: 2, size: TAMANHO_PAGINA_PRODUTOS },
    })
  })

  it("deve buscar os detalhes de um produto pelo id", async () => {
    vi.mocked(apiProtegida.get).mockResolvedValue({
      data: PRODUTO_DETALHADO,
    } as any)

    const resposta = await buscarProduto(PRODUTO_DETALHADO.id)

    expect(resposta).toEqual(PRODUTO_DETALHADO)
    expect(apiProtegida.get).toHaveBeenCalledWith(
      "/produtos/" + PRODUTO_DETALHADO.id
    )
    expect(apiProtegida.get).toHaveBeenCalledTimes(1)
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
