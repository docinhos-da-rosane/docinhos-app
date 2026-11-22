import type { PageResponse } from "@/shared/models/page.type"
import type { CatalogoProdutoResponse } from "@/features/catalogo/models/catalogo.produto.types"

export const CATALOGO_PRODUTOS: CatalogoProdutoResponse[] = [
  {
    id: "6fd124de-7664-4f4a-9efd-5c8aac3cc912'",
    nome: "Beijinho",
    categoria: "Tradicionais",
    imagemMenorUrl: "https://example.com/beijinho.jpg",
    disponivel: true,
    porcaoMenorPreco: {
      id: "fb655717-5e06-442f-b050-3d832ad35985",
      quantidade: 15,
      preco: 45,
    },
  },
  {
    id: "0204e0b1-149e-4128-9143-0a77e61e591f",
    nome: "Brigadeiro",
    categoria: "Tradicionais",
    imagemMenorUrl: "https://example.com/brigadeiro.jpg",
    disponivel: true,
    porcaoMenorPreco: {
      id: "5d92ce9a-18f0-45eb-aee1-440e75873ba2",
      quantidade: 20,
      preco: 55,
    },
  },
  {
    id: "aa43b44e-7642-4f39-9f44-5ddcf8b45b86",
    nome: "Cajuzinho",
    categoria: "Gourmet",
    imagemMenorUrl: "https://example.com/cajuzinho.jpg",
    disponivel: true,
    porcaoMenorPreco: {
      id: "8ecb80df-d719-4ddc-9bb9-cac1a6588d36",
      quantidade: 10,
      preco: 40,
    },
  },
  {
    id: "089fc383-6517-4558-ac20-0e55dfdd503a",
    nome: "Casadinho",
    categoria: "Gourmet",
    imagemMenorUrl: "https://example.com/casadinho.jpg",
    disponivel: true,
    porcaoMenorPreco: {
      id: "6ad51b4e-8681-480b-9b02-4b26ed78c3fa",
      quantidade: 12,
      preco: 48,
    },
  },
  {
    id: "72654b5b-16e9-4cb2-8811-69ff264ec7f6",
    nome: "Olho de sogra",
    categoria: "Tradicionais",
    imagemMenorUrl: "https://example.com/olho-de-sogra.jpg",
    disponivel: false,
    porcaoMenorPreco: {
      id: "266a9957-1047-4a2f-936c-c6f92b892986",
      quantidade: 15,
      preco: 50,
    },
  },
  {
    id: "226758b9-6bb5-42ac-8906-090f29125f77",
    nome: "Trufa",
    categoria: "Gourmet",
    imagemMenorUrl: "https://example.com/trufa.jpg",
    disponivel: false,
    porcaoMenorPreco: {
      id: "226758b9-6bb5-42ac-8906-090f29125f77",
      quantidade: 10,
      preco: 35,
    },
  },
]

export const CATALOGO_PAGINA_INICIAL: PageResponse<CatalogoProdutoResponse> = {
  content: CATALOGO_PRODUTOS,
  page: 0,
  size: 6,
  totalElements: 7,
  totalPages: 2,
}

export const CATALOGO_PAGINA_FINAL: PageResponse<CatalogoProdutoResponse> = {
  content: [
    {
      id: "5d14c1f8-a9f6-42a9-9614-524796334a70",
      nome: "Tortinha de limão",
      categoria: "Gourmet",
      imagemMenorUrl: "https://example.com/tortinha-de-limao.jpg",
      disponivel: true,
      porcaoMenorPreco: {
        id: "764930f8-6506-48b7-bd65-8f34b8449fb0",
        quantidade: 8,
        preco: 64,
      },
    },
  ],
  page: 1,
  size: 6,
  totalElements: 7,
  totalPages: 2,
}

export const CATALOGO_PAGINA_VAZIA: PageResponse<CatalogoProdutoResponse> = {
  content: [],
  page: 0,
  size: 6,
  totalElements: 0,
  totalPages: 0,
}
