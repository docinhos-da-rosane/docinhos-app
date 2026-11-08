import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import { CodeError } from "@/shared/errors/error.enum"
import { montarErroApp } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { alterarDisponibilidadeProduto, buscarProduto } from "../api/produtoApi"
import { ProdutoDetalhesPage } from "./ProdutoDetalhesPage"
import { PRODUTO_DETALHADO } from "@/test/mocks/produtoMocks"

vi.mock("../api/produtoApi", () => ({
  buscarProduto: vi.fn(),
  alterarDisponibilidadeProduto: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
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
    expect(
      screen.getByText(PRODUTO_DETALHADO.categoria.nome)
    ).toBeInTheDocument()
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

  it("deve abrir o Dialog de confirmação, cancelar e não envia o PATCH", async () => {
    vi.mocked(buscarProduto).mockResolvedValue(PRODUTO_DETALHADO)
    renderRotaDetalhes()

    await screen.findByRole("heading", { name: PRODUTO_DETALHADO.nome })
    fireEvent.click(
      await screen.findByRole("button", { name: "Marcar como indisponível" })
    )
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "Deseja marcar este produto como indisponível?"
    )
    expect(alterarDisponibilidadeProduto).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }))
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    )
    expect(alterarDisponibilidadeProduto).not.toHaveBeenCalled()
  })

  it("deve manter o status durante o envio e atualizar após o PATCH 204", async () => {
    let resolver!: () => void
    vi.mocked(buscarProduto)
      .mockResolvedValueOnce(PRODUTO_DETALHADO)
      .mockResolvedValueOnce({ ...PRODUTO_DETALHADO, disponivel: false })
    vi.mocked(alterarDisponibilidadeProduto).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolver = resolve
        })
    )
    renderRotaDetalhes()

    await screen.findByRole("heading", { name: PRODUTO_DETALHADO.nome })
    fireEvent.click(
      await screen.findByRole("button", { name: "Marcar como indisponível" })
    )
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }))

    await waitFor(() =>
      expect(alterarDisponibilidadeProduto).toHaveBeenCalledWith(
        PRODUTO_DETALHADO.id,
        false
      )
    )
    expect(
      screen.getByRole("button", {
        name: "Marcar como indisponível",
        hidden: true,
      })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled()
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" })
    expect(screen.getByRole("dialog")).toBeInTheDocument()

    resolver()
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    )
    expect(toast.success).toHaveBeenCalledWith(
      "Produto atualizado com sucesso!"
    )
    expect(
      await screen.findByRole("button", { name: "Marcar como disponível" })
    ).toBeInTheDocument()
  })

  it("deve apresentar a ação e a confirmação para disponibilizar produto indisponível", async () => {
    vi.mocked(buscarProduto).mockResolvedValue({
      ...PRODUTO_DETALHADO,
      disponivel: false,
    })
    renderRotaDetalhes()

    await screen.findByRole("heading", { name: PRODUTO_DETALHADO.nome })
    fireEvent.click(
      await screen.findByRole("button", { name: "Marcar como disponível" })
    )
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "Deseja marcar este produto como disponível?"
    )
    expect(alterarDisponibilidadeProduto).not.toHaveBeenCalled()
  })

  it("deve fechar o Dialog, preservar o status e notificar erro padrão quando o PATCH falha", async () => {
    vi.mocked(buscarProduto).mockResolvedValue(PRODUTO_DETALHADO)
    vi.mocked(alterarDisponibilidadeProduto).mockRejectedValue(
      erroApi(500, CodeError.ERRO_INTERNO)
    )
    renderRotaDetalhes()

    await screen.findByRole("heading", { name: PRODUTO_DETALHADO.nome })
    fireEvent.click(
      await screen.findByRole("button", { name: "Marcar como indisponível" })
    )
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }))

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    )
    expect(screen.getByText("Disponível")).toBeInTheDocument()
    expect(toast.error).toHaveBeenCalledWith(
      montarErroApp(CodeError.ERRO_INTERNO).mensagem
    )
  })
})
