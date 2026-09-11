import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { ProdutoCadastroPage } from "./ProdutoCadastroPage"

const mocks = vi.hoisted(() => ({
  cadastrar: vi.fn(),
  carregandoCategorias: false,
}))

vi.mock("../components/ProdutoForm", () => ({
  ProdutoForm: () => <div>Formulário de produto</div>,
}))

vi.mock("../view-model/useCadastroViewModel", () => ({
  useCadastroViewModel: () => ({
    cadastrar: mocks.cadastrar,
    carregando: false,
  }),
}))

vi.mock("../view-model/useOpcoesViewModel", () => ({
  useOpcoesViewModel: () => ({
    categoriasOpcoes: [],
    carregando: mocks.carregandoCategorias,
  }),
}))

function renderPage() {
  return render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: ROTAS_COMPLETAS.ADMIN.PRODUTOS_CADASTRO,
            element: <ProdutoCadastroPage />,
          },
          {
            path: ROTAS_COMPLETAS.ADMIN.PRODUTOS,
            element: <div>Lista de produtos</div>,
          },
        ],
        {
          initialEntries: [ROTAS_COMPLETAS.ADMIN.PRODUTOS_CADASTRO],
        }
      )}
    />
  )
}

describe(ProdutoCadastroPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.carregandoCategorias = false
  })

  it("deve voltar para a lista de produtos", async () => {
    renderPage()

    fireEvent.click(
      screen.getByRole("button", { name: "Voltar para produtos" })
    )

    await waitFor(() => {
      expect(screen.getByText("Lista de produtos")).toBeInTheDocument()
    })
  })

  it("deve exibir o carregamento enquanto busca categorias", () => {
    mocks.carregandoCategorias = true

    renderPage()

    expect(screen.getByTestId("page-loading")).toBeInTheDocument()
  })
})
