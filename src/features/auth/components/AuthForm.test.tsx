import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { AuthForm } from "./AuthForm"
import { LOGIN_DATA } from "@/test/mocks/authMocks"

describe(AuthForm.name, () => {
  it("deve renderizar os campos quando for renderizado", () => {
    render(<AuthForm onSubmit={vi.fn()} carregando={false} />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Senha")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument()
  })

  it("deve manter o botão desabilitado quando o formulário estiver vazio", () => {
    render(<AuthForm onSubmit={vi.fn()} carregando={false} />)

    expect(screen.getByRole("button", { name: "Entrar" })).toBeDisabled()
  })

  it("deve chamar onSubmit quando os dados forem válidos", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<AuthForm onSubmit={onSubmit} carregando={false} />)

    await user.type(screen.getByLabelText("Email"), LOGIN_DATA.email)
    await user.type(screen.getByLabelText("Senha"), LOGIN_DATA.senha)

    await user.click(screen.getByRole("button", { name: "Entrar" }))

    const [payload] = onSubmit.mock.calls[0]

    expect(payload).toEqual(LOGIN_DATA)
  })

  it("deve exibir mensagens de validação quando o formulário inválido for submetido", async () => {
    const onSubmit = vi.fn()
    const { container } = render(
      <AuthForm onSubmit={onSubmit} carregando={false} />
    )

    fireEvent.submit(container.querySelector("form")!)

    await waitFor(() => {
      expect(screen.getByText("O e-mail é obrigatório")).toBeInTheDocument()
      expect(screen.getByText("A senha é obrigatória")).toBeInTheDocument()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("deve desabilitar o botão e exibir carregamento quando estiver carregando", () => {
    render(<AuthForm onSubmit={vi.fn()} carregando />)

    const button = screen.getByRole("button", { name: "Entrando..." })

    expect(button).toBeDisabled()
  })
})
