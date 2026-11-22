import { render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { CATALOGO_PRODUTOS } from "@/test/mocks/catalogoMocks"
import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { CatalogoPage } from "./CatalogoPage"
import { useCatalogoViewModel } from "../view-model/useCatalogoViewModel"

vi.mock("../view-model/useCatalogoViewModel", () => ({
  useCatalogoViewModel: vi.fn(),
}))

const navegarParaPaginaAnterior = vi.fn()
const navegarParaProximaPagina = vi.fn()
const RouterWrapper = createMemoryRouterWrapper()

const estadoBase = {
  page: 0,
  produtos: CATALOGO_PRODUTOS,
  catalogoVazio: false,
  carregando: false,
  ocorreuErro: false,
  paginaAnteriorDesabilitada: true,
  proximaPaginaDesabilitada: false,
  navegarParaPaginaAnterior,
  navegarParaProximaPagina,
} as ReturnType<typeof useCatalogoViewModel>

describe(CatalogoPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCatalogoViewModel).mockReturnValue(estadoBase)
  })

  it("deve exibir o título e os produtos", () => {
    render(
      <RouterWrapper>
        <CatalogoPage />
      </RouterWrapper>
    )

    expect(
      screen.getByRole("heading", { name: "Nossos Docinhos" })
    ).toBeInTheDocument()
    const lista = screen.getByRole("list")
    expect(within(lista).getAllByRole("listitem")).toHaveLength(6)
  })

  it("deve indicar carregamento", () => {
    vi.mocked(useCatalogoViewModel).mockReturnValue({
      ...estadoBase,
      carregando: true,
    })
    render(<CatalogoPage />)

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando docinhos..."
    )
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  it("deve exibir o estado vazio", () => {
    vi.mocked(useCatalogoViewModel).mockReturnValue({
      ...estadoBase,
      produtos: [],
      catalogoVazio: true,
      proximaPaginaDesabilitada: true,
    })
    render(<CatalogoPage />)

    expect(
      screen.getByRole("heading", { name: "Nenhum docinho encontrado" })
    ).toBeInTheDocument()
  })
})
