import { fireEvent, render, screen, within } from "@testing-library/react"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import { CodeError } from "@/shared/errors/error.enum"
import { montarErroApp } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { buscarProduto } from "../api/produtoApi"
import { ProdutoDetalhesPage } from "./ProdutoDetalhesPage"
import { PRODUTO_DETALHADO } from "@/test/mocks/produtoMocks"

vi.mock("../api/produtoApi", () => ({
  buscarProduto: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}))

function erroApi(status: number, codeError: string) {
  return {
    isAxiosError: true,
    response: { status, data: { codeError } },
  }
}

function LocalizacaoAtual() {
  const location = useLocation()
  return (
    <span data-testid="test-location">
      {location.pathname}
      {location.search}
    </span>
  )
}

function renderRotaDetalhes() {
  const Wrapper = createQueryMemoryRouterWrapper([
    "/admin/produtos/" + PRODUTO_DETALHADO.id,
  ])

  return render(
    <Wrapper>
      <Routes>
        <Route path="/admin/produtos/:id" element={<ProdutoDetalhesPage />} />
        <Route
          path="/admin/produtos"
          element={
            <Link
              to={"/admin/produtos/" + PRODUTO_DETALHADO.id + "?page=1"}
              state={{ from: "/admin/produtos?page=1" }}
            >
              Abrir detalhes
            </Link>
          }
        />
        <Route
          path="/admin"
          element={<span>Página inicial administrativa</span>}
        />
      </Routes>
      <LocalizacaoAtual />
    </Wrapper>
  )
}

describe(ProdutoDetalhesPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve indicar carregamento sem exibir dados ou ações antes da resposta", async () => {
    renderRotaDetalhes()

    expect(screen.getByTestId("page-loading")).toBeInTheDocument()
    expect(screen.queryByText(PRODUTO_DETALHADO.nome)).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Editar produto" })
    ).toBeInTheDocument()
  })

  it("deve retornar a pagina inicial da listagem", async () => {
    vi.mocked(buscarProduto).mockResolvedValue(PRODUTO_DETALHADO)
    renderRotaDetalhes()

    await screen.findByRole("heading", { name: PRODUTO_DETALHADO.nome })
    fireEvent.click(
      screen.getByRole("button", { name: "Voltar para produtos" })
    )

    expect(
      await screen.findByRole("link", { name: "Abrir detalhes" })
    ).toBeInTheDocument()
    expect(screen.getByTestId("test-location")).toHaveTextContent(
      "/admin/produtos"
    )
  })

  it("deve notificar o erro padrão 404 e ir para o início administrativo", async () => {
    vi.mocked(buscarProduto).mockRejectedValue(
      erroApi(404, CodeError.NAO_ENCONTRADO)
    )

    renderRotaDetalhes()

    expect(
      await screen.findByText("Página inicial administrativa")
    ).toBeInTheDocument()
    expect(toast.error).toHaveBeenCalledWith(
      montarErroApp(CodeError.NAO_ENCONTRADO).mensagem
    )
    expect(toast.error).toHaveBeenCalledTimes(1)
  })

  it("deve notificar o erro 400 e retorna ao início administrativo", async () => {
    vi.mocked(buscarProduto).mockRejectedValue(
      erroApi(400, CodeError.DADOS_INVALIDOS)
    )

    renderRotaDetalhes()

    expect(
      await screen.findByText("Página inicial administrativa")
    ).toBeInTheDocument()
    expect(screen.getByTestId("test-location")).toHaveTextContent("/admin")
    expect(toast.error).toHaveBeenCalledWith(
      montarErroApp(CodeError.DADOS_INVALIDOS).mensagem
    )
  })

  it("apresenta todos os dados e preserva a ordem e a formatação das porções", async () => {
    vi.mocked(buscarProduto).mockResolvedValue(PRODUTO_DETALHADO)

    renderRotaDetalhes()

    await screen.findByRole("heading", { name: PRODUTO_DETALHADO.nome })
    expect(screen.getByText(PRODUTO_DETALHADO.descricao)).toBeInTheDocument()
    expect(screen.getByText(PRODUTO_DETALHADO.categoria)).toBeInTheDocument()
    expect(screen.getByText("Disponível")).toBeInTheDocument()
    expect(screen.queryByText("Disponibilidade")).toBeInTheDocument()

    const fotografia = screen.getByRole("img", { name: PRODUTO_DETALHADO.nome })
    expect(fotografia).toHaveAttribute("src", PRODUTO_DETALHADO.imagemUrl)

    const itens = within(screen.getByRole("list")).getAllByRole("listitem")
    expect(itens).toHaveLength(3)
    expect(itens[0]).toHaveTextContent("15 unidades")
    expect(itens[0]).toHaveTextContent(/R\$\s?55,00/)
    expect(itens[1]).toHaveTextContent("25 unidades")
    expect(itens[1]).toHaveTextContent(/R\$\s?85,00/)
    expect(itens[2]).toHaveTextContent("50 unidades")
    expect(itens[2]).toHaveTextContent(/R\$\s?155,00/)
  })
})
