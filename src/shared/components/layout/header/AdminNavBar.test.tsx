import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { AdminNavBar } from "./AdminNavBar"

const mocks = vi.hoisted(() => ({
  sair: vi.fn(),
}))

vi.mock("@/features/auth", () => ({
  useLogoutViewModel: () => ({
    sair: mocks.sair,
  }),
}))

describe(AdminNavBar.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve renderizar o cabeçalho quando for exibido", () => {
    render(<AdminNavBar />)

    expect(screen.getByText("Docinhos da")).toBeInTheDocument()
    expect(screen.getByText("Rosane")).toBeInTheDocument()
    expect(screen.getByText("área dministrativa")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument()
  })

  it("deve chamar sair quando o botão for clicado", async () => {
    const user = userEvent.setup()

    render(<AdminNavBar />)

    await user.click(screen.getByRole("button", { name: "Sair" }))

    expect(mocks.sair).toHaveBeenCalledTimes(1)
  })
})
