import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { useLocation } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryMemoryRouterWrapper } from "@/test/createQueryMemoryRouterWrapper"
import { toast } from "sonner"
import { buscarProdutos } from "../api/produtoApi"
import type {
  PageResponse,
  ProdutoResumoResponse,
} from "../models/produto.types"
import { ProdutoListaPage } from "./ProdutoListaPage"

vi.mock("../api/produtoApi", () => ({
  buscarProdutos: vi.fn(),
  TAMANHO_PAGINA_PRODUTOS: 6,
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}))

const produtos: ProdutoResumoResponse[] = [
  {
    id: "produto-1",
    nome: "Beijinho de Coco",
    categoria: "Tradicionais",
    imagemMiniaturaUrl: "https://example.com/beijinho-miniatura.jpg",
    disponivel: true,
  },
  {
    id: "produto-2",
    nome: "Brigadeiro Tradicional",
    categoria: "Tradicionais",
    imagemMiniaturaUrl: "https://example.com/brigadeiro-miniatura.jpg",
    disponivel: true,
  },
  {
    id: "produto-3",
    nome: "Cajuzinho",
    categoria: "Tradicionais",
    imagemMiniaturaUrl: "https://example.com/cajuzinho-miniatura.jpg",
    disponivel: false,
  },
]

const primeiraPagina: PageResponse<ProdutoResumoResponse> = {
  content: produtos,
  page: 0,
  size: 6,
  totalElements: 7,
  totalPages: 2,
}

const segundaPagina: PageResponse<ProdutoResumoResponse> = {
  content: [
    {
      id: "produto-7",
      nome: "Trufa de Chocolate",
      categoria: "Gourmet",
      imagemMiniaturaUrl: "https://example.com/trufa-miniatura.jpg",
      disponivel: false,
    },
  ],
  page: 1,
  size: 6,
  totalElements: 7,
  totalPages: 2,
}

function LocalizacaoAtual() {
  const location = useLocation()
  return <span data-testid="localizacao-atual">{location.pathname}</span>
}

function renderProdutoListaPage() {
  const Wrapper = createQueryMemoryRouterWrapper(["/admin/produtos"])

  return render(
    <Wrapper>
      <ProdutoListaPage />
      <LocalizacaoAtual />
    </Wrapper>
  )
}

describe(ProdutoListaPage.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve apresentar os dados e a ordem recebida da API", async () => {
    vi.mocked(buscarProdutos).mockResolvedValue(primeiraPagina)

    renderProdutoListaPage()

    const tabela = await screen.findByRole("table")
    expect(screen.getByText("Beijinho de Coco")).toBeInTheDocument()
    expect(screen.getByText("Brigadeiro Tradicional")).toBeInTheDocument()
    expect(screen.getAllByText("Tradicionais")).toHaveLength(3)
    expect(screen.getAllByText("Disponível")).toHaveLength(2)
    expect(screen.getByText("Indisponível")).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: "Beijinho de Coco" })
    ).toHaveAttribute("src", produtos[0].imagemMiniaturaUrl)

    const linhas = within(tabela).getAllByRole("row").slice(1)
    expect(linhas[0]).toHaveTextContent("Beijinho de Coco")
    expect(linhas[1]).toHaveTextContent("Brigadeiro Tradicional")
    expect(linhas[2]).toHaveTextContent("Cajuzinho")

    expect(buscarProdutos).toHaveBeenCalledWith(0)
    expect(
      screen.getByRole("button", { name: "Página anterior" })
    ).toBeDisabled()
    expect(screen.getByRole("button", { name: "Próxima página" })).toBeEnabled()
  })

  it("deve indicar carregamento sem antecipar lista vazia", async () => {
    let concluirConsulta!: (
      resposta: PageResponse<ProdutoResumoResponse>
    ) => void
    vi.mocked(buscarProdutos).mockReturnValue(
      new Promise((resolve) => {
        concluirConsulta = resolve
      })
    )

    renderProdutoListaPage()

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando produtos..."
    )
    expect(
      screen.queryByText("Nenhum produto cadastrado")
    ).not.toBeInTheDocument()

    await act(async () => concluirConsulta(primeiraPagina))
    expect(await screen.findByRole("table")).toBeInTheDocument()
  })

  it("deve navegar entre as páginas e mostrar o loader durante a troca", async () => {
    let concluirSegundaPagina!: (
      resposta: PageResponse<ProdutoResumoResponse>
    ) => void
    vi.mocked(buscarProdutos).mockImplementation((page) =>
      page === 0
        ? Promise.resolve(primeiraPagina)
        : new Promise((resolve) => {
            concluirSegundaPagina = resolve
          })
    )

    renderProdutoListaPage()

    await screen.findByText("Beijinho de Coco")
    fireEvent.click(screen.getByRole("button", { name: "Próxima página" }))

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando produtos..."
    )
    expect(
      screen.queryByText("Nenhum produto cadastrado")
    ).not.toBeInTheDocument()
    expect(buscarProdutos).toHaveBeenLastCalledWith(1)

    await act(async () => concluirSegundaPagina(segundaPagina))

    expect(await screen.findByText("Trufa de Chocolate")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Página anterior" })
    ).toBeEnabled()
    expect(
      screen.getByRole("button", { name: "Próxima página" })
    ).toBeDisabled()

    fireEvent.click(screen.getByRole("button", { name: "Página anterior" }))
    expect(await screen.findByText("Beijinho de Coco")).toBeInTheDocument()
    expect(buscarProdutos).toHaveBeenLastCalledWith(0)
  })

  it("deve apresentar o estado vazio somente quando totalElements for zero", async () => {
    vi.mocked(buscarProdutos).mockResolvedValue({
      content: [],
      page: 0,
      size: 6,
      totalElements: 0,
      totalPages: 0,
    })

    renderProdutoListaPage()

    expect(
      await screen.findByText("Nenhum produto cadastrado")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Cadastre o primeiro produto para começar a montar o catálogo."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Cadastrar produto" })
    ).toBeEnabled()
    expect(
      screen.getByRole("button", { name: "Página anterior" })
    ).toBeDisabled()
    expect(
      screen.getByRole("button", { name: "Próxima página" })
    ).toBeDisabled()
  })

  it("não deve tratar uma página sem itens como catálogo vazio quando há produtos", async () => {
    vi.mocked(buscarProdutos).mockResolvedValue({
      ...primeiraPagina,
      content: [],
      page: 1,
      totalElements: 7,
      totalPages: 2,
    })

    renderProdutoListaPage()

    expect(await screen.findByRole("table")).toBeInTheDocument()
    expect(
      screen.queryByText("Nenhum produto cadastrado")
    ).not.toBeInTheDocument()
  })

  it("deve mostrar o erro na lista e notificar a mensagem mapeada", async () => {
    vi.mocked(buscarProdutos).mockRejectedValue(new Error("Falha de rede"))

    renderProdutoListaPage()

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Ocorreu um erro ao carregar os produtos. Tente novamente."
    )
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Ocorreu um erro inesperado. Tente novamente mais tarde."
      )
    })
    expect(
      screen.queryByText("Nenhum produto cadastrado")
    ).not.toBeInTheDocument()
  })

  it("deve levar a ação do estado vazio para o cadastro existente", async () => {
    vi.mocked(buscarProdutos).mockResolvedValue({
      content: [],
      page: 0,
      size: 6,
      totalElements: 0,
      totalPages: 0,
    })

    renderProdutoListaPage()

    fireEvent.click(
      await screen.findByRole("button", { name: "Cadastrar produto" })
    )

    await waitFor(() => {
      expect(screen.getByTestId("localizacao-atual")).toHaveTextContent(
        "/admin/produtos/cadastro"
      )
    })
  })
})
