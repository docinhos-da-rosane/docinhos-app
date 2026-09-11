import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { ProdutoListaPage } from "./ProdutoListaPage"
import { MemoryRouter } from "react-router-dom"

vi.mock("@/shared/hooks/health-check/useHealthCheck", () => ({
  useHealthCheck: () => ({ data: null, error: null, isPending: false }),
}))

describe(ProdutoListaPage.name, () => {
  it("deve renderizar a página da lista de produtos", () => {
    render(
      <MemoryRouter>
        <ProdutoListaPage />
      </MemoryRouter>
    )
    expect(screen.getByText("Produtos")).toBeInTheDocument()
  })
})
