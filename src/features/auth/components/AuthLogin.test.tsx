import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { AuthLogin } from "./AuthLogin"
import userEvent from "@testing-library/user-event"
import { LOGIN_DATA } from "@/test/mocks/authMocks"

const mocks = vi.hoisted(() => ({
  entrar: vi.fn(),
  carregando: false,
}))

vi.mock("../view-model/useLoginViewModel", () => ({
  useLoginViewModel: () => ({
    entrar: mocks.entrar,
    carregando: mocks.carregando,
  }),
}))

const RouterWrapper = createMemoryRouterWrapper()

describe(AuthLogin.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.carregando = false
  })

  it("deve renderizar o conteúdo quando for renderizado", () => {
    render(
      <RouterWrapper>
        <AuthLogin />
      </RouterWrapper>
    )

    expect(screen.getByText("Área")).toBeInTheDocument()
    expect(screen.getByText("Administrativa")).toBeInTheDocument()
    expect(screen.getByText("Voltar para o site")).toBeInTheDocument()
  })

  it("deve chamar entrar quando o formulário for submetido", async () => {
    const user = userEvent.setup()

    render(
      <RouterWrapper>
        <AuthLogin />
      </RouterWrapper>
    )

    await user.type(screen.getByLabelText("Email"), LOGIN_DATA.email)
    await user.type(screen.getByLabelText("Senha"), LOGIN_DATA.senha)

    await user.click(screen.getByRole("button", { name: "Entrar" }))

    const [payload] = mocks.entrar.mock.calls[0]
    expect(payload).toEqual(LOGIN_DATA)
  })

  it("deve repassar o carregamento quando estiver carregando", () => {
    mocks.carregando = true

    render(
      <RouterWrapper>
        <AuthLogin />
      </RouterWrapper>
    )

    expect(screen.getByText("Entrando...")).toBeInTheDocument()
  })
})
