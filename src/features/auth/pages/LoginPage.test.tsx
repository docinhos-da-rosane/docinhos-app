import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { LoginPage } from "./LoginPage"

vi.mock("../components/AuthLogin", () => ({
  AuthLogin: () => <div>Formulário de login</div>,
}))

describe(LoginPage.name, () => {
  it("deve renderizar o formulário de autenticação quando a página for renderizada", () => {
    render(<LoginPage />)

    expect(screen.getByText("Formulário de login")).toBeInTheDocument()
  })
})
