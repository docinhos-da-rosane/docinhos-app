import { describe, expect, it } from "vitest"

import { toOpcao } from "./categoria.mapper"
import { CATEGORIAS, CATEGORIAS_OPCOES } from "@/test/mocks/categoriaMocks"

describe("categoria.mapper", () => {
  describe(toOpcao.name, () => {
    it("deve converter categoria para opção", () => {
      expect(toOpcao(CATEGORIAS[0])).toEqual(CATEGORIAS_OPCOES[0])
    })
  })
})
