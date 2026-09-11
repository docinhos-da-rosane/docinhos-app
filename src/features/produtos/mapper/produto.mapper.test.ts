import { describe, expect, it } from "vitest"

import { toCriarProdutoFormData, toCriarProdutoRequest } from "./produto.mapper"
import {
  CRIAR_PRODUTO_REQUEST,
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

  describe(toCriarProdutoFormData.name, () => {
    it("deve adicionar o produto serializado ao FormData", async () => {
      const formData = toCriarProdutoFormData(PRODUTO_FORM_DATA)
      const produto = formData.get("produto")

      expect(produto).toBeInstanceOf(Blob)

      expect(await (produto as Blob).text()).toBe(
        JSON.stringify(CRIAR_PRODUTO_REQUEST)
      )
    })
  })
})
