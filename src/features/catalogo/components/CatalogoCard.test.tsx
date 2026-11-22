import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { CATALOGO_PRODUTOS } from "@/test/mocks/catalogoMocks"
import { CatalogoCard } from "./CatalogoCard"

const RouterWrapper = createMemoryRouterWrapper()

describe(CatalogoCard.name, () => {
  it("deve exibir foto, categoria e preço com quantidade da porção", () => {
    render(
      <RouterWrapper>
        <CatalogoCard produto={CATALOGO_PRODUTOS[0]} />
      </RouterWrapper>
    )

    expect(screen.getByRole("img", { name: "Beijinho" })).toHaveAttribute(
      "src",
      "https://example.com/beijinho.jpg"
    )
    expect(
      screen.getByRole("img", { name: "Beijinho" }).parentElement
    ).toHaveClass("aspect-video")
    expect(screen.getByText("Tradicionais")).toBeInTheDocument()
    expect(
      screen.getByText("A partir de R$ 45,00 (15 unidades)")
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Ver Detalhes" })).toBeEnabled()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })

  it("deve destacar e desabilitar ações de produto indisponível", () => {
    render(
      <RouterWrapper>
        <CatalogoCard produto={CATALOGO_PRODUTOS[4]} />
      </RouterWrapper>
    )

    const article = screen.getByRole("article")
    expect(
      within(article).getByText("Indisponível no momento")
    ).toBeInTheDocument()
    expect(
      within(article).getByRole("button", { name: "Indisponível" })
    ).toBeDisabled()
  })
})
