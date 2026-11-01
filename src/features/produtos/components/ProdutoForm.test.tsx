import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Route, Routes } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { ProdutoForm } from "./ProdutoForm"
import { CATEGORIAS_OPCOES } from "@/test/mocks/categoriaMocks"
import {
  produtoSchemaEdicao,
  produtoValoresPadrao,
  type ProdutoFormDataEdicao,
} from "../schemas/produto.schema"

const RouterWrapper = createMemoryRouterWrapper()

type ProdutoFormProps = Omit<
  React.ComponentProps<typeof ProdutoForm>,
  "methods"
>

function ProdutoFormComponente(props: Partial<ProdutoFormProps> = {}) {
  const methods = useForm<ProdutoFormDataEdicao>({
    resolver: zodResolver(produtoSchemaEdicao),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: produtoValoresPadrao,
  })

  return (
    <ProdutoForm
      onSubmit={vi.fn()}
      categoriasOpcoes={CATEGORIAS_OPCOES}
      carregando={false}
      methods={methods}
      {...props}
    />
  )
}

function renderForm(props: Partial<ProdutoFormProps> = {}) {
  return render(
    <RouterWrapper>
      <ProdutoFormComponente {...props} />
    </RouterWrapper>
  )
}

describe(ProdutoForm.name, () => {
  it("deve renderizar os campos do produto, da foto e da porção", () => {
    renderForm()

    expect(screen.getByText("Nome do produto")).toBeInTheDocument()
    expect(screen.getByText("Categoria")).toBeInTheDocument()
    expect(screen.getByText("Descrição")).toBeInTheDocument()
    expect(screen.getByText("Quantidade (un.)")).toBeInTheDocument()
    expect(screen.getByText("Preço (R$)")).toBeInTheDocument()
    expect(screen.getByText("Foto do Produto")).toBeInTheDocument()
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

  it("deve exibir o texto de ação informado para atualização", () => {
    renderForm({ textoAcao: "Atualizar Produto" })

    expect(
      screen.getByRole("button", { name: "Atualizar Produto" })
    ).toBeInTheDocument()
  })

  it("deve navegar para a rota de cancelamento", async () => {
    const user = userEvent.setup()
    const CancelRouteWrapper = createMemoryRouterWrapper([
      "/produtos/cadastrar",
    ])

    render(
      <CancelRouteWrapper>
        <Routes>
          <Route
            path="/produtos/cadastrar"
            element={<ProdutoFormComponente rotaCancelar="/produtos" />}
          />
          <Route path="/produtos" element={<p>Lista de produtos</p>} />
        </Routes>
      </CancelRouteWrapper>
    )

    await user.click(screen.getByRole("button", { name: "Cancelar" }))

    await waitFor(() => {
      expect(screen.getByText("Lista de produtos")).toBeInTheDocument()
    })
  })
})
