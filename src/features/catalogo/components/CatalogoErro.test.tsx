import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { CatalogoErro } from "./CatalogoErro"

const RouterWrapper = createMemoryRouterWrapper()

describe(CatalogoErro.name, () => {
  it("deve exibir a mensagem de erro e o link para a página inicial", () => {
    const titulo = "Não conseguimos carregar o catálogo"
    const descricao = "Tivemos um problema ao buscar os docinhos."

    render(
      <RouterWrapper>
        <CatalogoErro titulo={titulo} descricao={descricao} />
      </RouterWrapper>
    )

    expect(
      screen.getByRole("heading", {
        name: titulo,
      })
    ).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveTextContent(descricao)
    expect(
      screen.getByRole("link", { name: "Voltar para a página inicial" })
    ).toHaveAttribute("href", "/")
  })
})
