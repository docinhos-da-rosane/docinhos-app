import type {
  CriarProdutoRequest,
  ProdutoDetalhadoResponse,
} from "../models/produto.types"
import type {
  ProdutoFormData,
  ProdutoFormValues,
} from "../schemas/produto.schema"

export function toCriarProdutoRequest(
  dados: ProdutoFormValues
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

export function toCriarFormData(dados: ProdutoFormValues): FormData {
  const formData = new FormData()

  const produto = toCriarProdutoRequest(dados)

  if (dados.imagem) {
    formData.append("imagem", dados.imagem as Blob)
  }

  formData.append(
    "produto",
    new Blob([JSON.stringify(produto)], {
      type: "application/json",
    })
  )

  return formData
}

export function toCriarProdutoFormData(
  dados: ProdutoDetalhadoResponse
): ProdutoFormData {
  return {
    nome: dados.nome,
    descricao: dados.descricao,
    categoriaId: dados.categoria.id,
    imagem: undefined,
    porcoes: dados.porcoes.map((porcao) => ({
      quantidade: String(porcao.quantidade),
      preco: String(porcao.preco).replace(",", "."),
    })),
  }
}
