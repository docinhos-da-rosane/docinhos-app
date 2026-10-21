import type {
  CriarProdutoRequest,
  PageResponse,
  ProdutoDetalhadoResponse,
  ProdutoResumoResponse,
} from "@/features/produtos/models/produto.types"
import type { ProdutoFormData } from "@/features/produtos/schemas/produto.schema"

export const PRODUTO_ID = "a82427ea-22a7-4264-9719-56683cd01295"

export const PRODUTO_FORM_DATA: ProdutoFormData = {
  nome: "Brigadeiro",
  descricao: "Brigadeiro tradicional",
  categoriaId: "categoria-uuid-1",
  imagem: new File([""], "produto1.png", { type: "image/png" }),
  porcoes: [
    {
      quantidade: "10",
      preco: "5,50",
    },
    {
      quantidade: "20",
      preco: "9.99",
    },
  ],
}

export const CRIAR_PRODUTO_REQUEST: CriarProdutoRequest = {
  nome: "Brigadeiro",
  descricao: "Brigadeiro tradicional",
  categoriaId: "categoria-uuid-1",
  porcoes: [
    {
      quantidade: 10,
      preco: 5.5,
    },
    {
      quantidade: 20,
      preco: 9.99,
    },
  ],
}

export const PAGINA_INICIAL: PageResponse<ProdutoResumoResponse> = {
  content: [
    {
      id: "produto-1",
      nome: "Brigadeiro",
      categoria: "Tradicionais",
      imagemMiniaturaUrl: "https://example.com/brigadeiro-miniatura.jpg",
      disponivel: true,
    },
  ],
  page: 0,
  size: 6,
  totalElements: 7,
  totalPages: 2,
}

export const PRODUTO_DETALHADO: ProdutoDetalhadoResponse = {
  id: PRODUTO_ID,
  nome: "Brigadeiro Tradicional",
  descricao: "Descrição completa do brigadeiro.",
  categoria: "Tradicionais",
  disponivel: true,
  imagemUrl: "https://example.com/brigadeiro.jpg",
  porcoes: [
    { quantidade: 15, preco: 55 },
    { quantidade: 25, preco: 85 },
    { quantidade: 50, preco: 155 },
  ],
}
