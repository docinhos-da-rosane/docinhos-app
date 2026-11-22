import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CatalogoListaVazia } from "./CatalogoListaVazia"

describe(CatalogoListaVazia.name, () => {
  it("deve exibir o estado vazio", () => {
    render(<CatalogoListaVazia />)

    expect(
      screen.getByRole("heading", { name: "Nenhum docinho encontrado" })
    ).toBeInTheDocument()
  })
})
