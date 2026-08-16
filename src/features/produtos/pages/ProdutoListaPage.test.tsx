import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ProdutoListaPage } from "./ProdutoListaPage"

describe(ProdutoListaPage.name, () => {
  it("deve renderizar a página da lista de produtos", () => {
    render(<ProdutoListaPage />)

    expect(screen.getByText("Página de lista de produtos")).toBeInTheDocument()
  })
})
