import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CatalogoPage } from "./CatalogoPage"

describe(CatalogoPage.name, () => {
  it("deve renderizar a página do cardápio", () => {
    render(<CatalogoPage />)

    expect(screen.getByText("Página do cardapio")).toBeInTheDocument()
  })
})
