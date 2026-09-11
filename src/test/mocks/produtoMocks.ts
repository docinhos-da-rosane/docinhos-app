import type { CriarProdutoRequest } from "@/features/produtos/models/produto.types"
import type { ProdutoFormData } from "@/features/produtos/schemas/produto.schema"

export const PRODUTO_FORM_DATA: ProdutoFormData = {
  nome: "Brigadeiro",
  descricao: "Brigadeiro tradicional",
  categoriaId: "categoria-uuid-1",
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
