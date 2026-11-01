import { describe, expect, it } from "vitest"

import {
  toCriarFormData,
  toCriarProdutoFormData,
  toCriarProdutoRequest,
} from "./produto.mapper"
import {
  CRIAR_PRODUTO_REQUEST,
  PRODUTO_DETALHADO,
  PRODUTO_FORM_DATA,
} from "@/test/mocks/produtoMocks"

describe("produto.mapper", () => {
  describe(toCriarProdutoRequest.name, () => {
    it("deve converter os dados do formulário para a requisição", () => {
      expect(toCriarProdutoRequest(PRODUTO_FORM_DATA)).toEqual(
        CRIAR_PRODUTO_REQUEST
      )
    })
  })

  describe(toCriarFormData.name, () => {
    it("deve serializar o produto e incluir a imagem quando informada", async () => {
      const formData = toCriarFormData(PRODUTO_FORM_DATA)
      const produto = formData.get("produto")

      expect(produto).toBeInstanceOf(Blob)
      expect(await (produto as Blob).text()).toBe(
        JSON.stringify(CRIAR_PRODUTO_REQUEST)
      )
      expect(formData.get("imagem")).toEqual(PRODUTO_FORM_DATA.imagem)
    })
  })

  describe(toCriarProdutoFormData.name, () => {
    it("deve converter os detalhes do produto para os valores do formulário", () => {
      expect(toCriarProdutoFormData(PRODUTO_DETALHADO)).toEqual({
        nome: PRODUTO_DETALHADO.nome,
        descricao: PRODUTO_DETALHADO.descricao,
        categoriaId: PRODUTO_DETALHADO.categoria.id,
        imagem: undefined,
        porcoes: PRODUTO_DETALHADO.porcoes.map((porcao) => ({
          quantidade: String(porcao.quantidade),
          preco: String(porcao.preco),
        })),
      })
    })
  })
})
