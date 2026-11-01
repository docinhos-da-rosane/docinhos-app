import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import { PRODUTO_DETALHADO, PRODUTO_ID } from "@/test/mocks/produtoMocks"
import { ProdutoEdicaoPage } from "./ProdutoEdicaoPage"

const mocks = vi.hoisted(() => ({
  buscarProduto: vi.fn(),
  atualizarProduto: vi.fn(),
}))

vi.mock("../api/produtoApi", () => ({
  buscarProduto: mocks.buscarProduto,
  atualizarProduto: mocks.atualizarProduto,
}))

vi.mock("../view-model/useOpcoesViewModel", () => ({
  useOpcoesViewModel: () => ({
    categoriasOpcoes: [],
    carregando: false,
  }),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

function renderPage() {
  const Wrapper = createQueryMemoryRouterWrapper([
    `/admin/produtos/${PRODUTO_ID}/edicao`,
  ])

  return render(
    <Wrapper>
      <Routes>
        <Route
          path="/admin/produtos/:id/edicao"
          element={<ProdutoEdicaoPage />}
        />
        <Route
          path="/admin/produtos/:id"
          element={<p>Detalhes do produto</p>}
        />
      </Routes>
    </Wrapper>
  )
}

describe(ProdutoEdicaoPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.buscarProduto.mockResolvedValue(PRODUTO_DETALHADO)
    mocks.atualizarProduto.mockResolvedValue(undefined)
  })

  it("deve preencher o formulário e exibir a imagem atual do produto", async () => {
    renderPage()

    expect(
      await screen.findByDisplayValue(PRODUTO_DETALHADO.nome)
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(PRODUTO_DETALHADO.descricao)
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        PRODUTO_DETALHADO.imagemUrl
      )
    })
  })

  it("deve permitir atualizar sem enviar uma nova imagem e volta aos detalhes", async () => {
    renderPage()

    await screen.findByDisplayValue(PRODUTO_DETALHADO.nome)
    const formulario = screen.getByTestId("input-nome").closest("form")

    expect(formulario).not.toBeNull()
    fireEvent.submit(formulario!)

    await waitFor(() => {
      expect(mocks.atualizarProduto).toHaveBeenCalledWith(
        PRODUTO_ID,
        expect.any(FormData)
      )
    })
    expect(await screen.findByText("Detalhes do produto")).toBeInTheDocument()

    const [, formData] = mocks.atualizarProduto.mock.calls[0]
    expect(formData.has("imagem")).toBe(false)
  })
})
