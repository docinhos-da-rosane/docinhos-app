import type { CriarProdutoRequest } from "../models/produto.types"
import type { ProdutoFormData } from "../schemas/produto.schema"

export function toCriarProdutoRequest(
  dados: ProdutoFormData
): CriarProdutoRequest {
  return {
    nome: dados.nome,
    descricao: dados.descricao,
    categoriaId: dados.categoriaId,
    porcoes: dados.porcoes.map((porcao) => ({
      quantidade: Number(porcao.quantidade),
      preco: Number(porcao.preco.replace(",", ".")),
    })),
  }
}

export function toCriarProdutoFormData(dados: ProdutoFormData): FormData {
  const formData = new FormData()

  const produto = toCriarProdutoRequest(dados)

  formData.append(
    "produto",
    new Blob([JSON.stringify(produto)], {
      type: "application/json",
    })
  )

  return formData
}
