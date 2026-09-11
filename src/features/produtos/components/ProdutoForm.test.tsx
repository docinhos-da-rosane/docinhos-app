import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import { ProdutoForm } from "./ProdutoForm"
import { CATEGORIAS_OPCOES } from "@/test/mocks/categoriaMocks"

function renderForm(
  props: Partial<React.ComponentProps<typeof ProdutoForm>> = {}
) {
  return render(
    <MemoryRouter>
      <ProdutoForm
        onSubmit={vi.fn()}
        categoriasOpcoes={CATEGORIAS_OPCOES}
        carregando={false}
        {...props}
      />
    </MemoryRouter>
  )
}

describe(ProdutoForm.name, () => {
  it("deve renderizar os campos do produto e da porção", () => {
    renderForm()

    expect(screen.getByText("Nome do produto")).toBeInTheDocument()
    expect(screen.getByText("Categoria")).toBeInTheDocument()
    expect(screen.getByText("Descrição")).toBeInTheDocument()
    expect(screen.getByText("Quantidade (un.)")).toBeInTheDocument()
    expect(screen.getByText("Preço (R$)")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Cadastrar Produto" })
    ).toBeInTheDocument()
  })

  it("deve manter o botão desabilitado quando o formulário estiver vazio", () => {
    renderForm()

    expect(
      screen.getByRole("button", { name: "Cadastrar Produto" })
    ).toBeDisabled()
  })

  it("deve adicionar outra porção", async () => {
    const user = userEvent.setup()

    renderForm()

    await user.click(
      screen.getByRole("button", { name: "Adicionar outra porção" })
    )

    expect(screen.getAllByText("Quantidade (un.)")).toHaveLength(2)
    expect(screen.getAllByText("Preço (R$)")).toHaveLength(2)
  })

  it("deve exibir Atualizar Produto quando estiver atualizando", () => {
    renderForm({ atualizar: true })

    expect(
      screen.getByRole("button", { name: "Atualizar Produto" })
    ).toBeInTheDocument()
  })

  it("deve navegar para a rota de cancelamento", async () => {
    const user = userEvent.setup()

    const router = createMemoryRouter(
      [
        {
          path: "/produtos/cadastrar",
          element: (
            <ProdutoForm
              onSubmit={vi.fn()}
              categoriasOpcoes={CATEGORIAS_OPCOES}
              carregando={false}
              rotaCancelar="/produtos"
            />
          ),
        },
        {
          path: "/produtos",
          element: <p>Lista de produtos</p>,
        },
      ],
      {
        initialEntries: ["/produtos/cadastrar"],
      }
    )

    render(<RouterProvider router={router} />)

    await user.click(screen.getByRole("button", { name: "Cancelar" }))

    await waitFor(() => {
      expect(screen.getByText("Lista de produtos")).toBeInTheDocument()
    })
  })
})
