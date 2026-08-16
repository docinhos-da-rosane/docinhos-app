import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LoginPage } from "./LoginPage"

describe(LoginPage.name, () => {
  it("deve renderizar a página de login", () => {
    render(<LoginPage />)

    expect(screen.getByText("Página de login")).toBeInTheDocument()
  })
})
