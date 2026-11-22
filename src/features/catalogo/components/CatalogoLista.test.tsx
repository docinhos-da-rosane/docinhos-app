import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { CATALOGO_PRODUTOS } from "@/test/mocks/catalogoMocks"
import { CatalogoLista } from "./CatalogoLista"

const RouterWrapper = createMemoryRouterWrapper()

describe(CatalogoLista.name, () => {
  it("deve exibir todos os produtos na ordem recebida", () => {
    render(
      <RouterWrapper>
        <CatalogoLista produtos={CATALOGO_PRODUTOS} />
      </RouterWrapper>
    )

    const lista = screen.getByRole("list")
    const itens = within(lista).getAllByRole("listitem")

    expect(itens).toHaveLength(CATALOGO_PRODUTOS.length)
    expect(
      itens.map((item) => within(item).getByRole("heading").textContent)
    ).toEqual(CATALOGO_PRODUTOS.map((produto) => produto.nome))
    expect(within(lista).getAllByText("Indisponível no momento")).toHaveLength(
      2
    )
  })
})
