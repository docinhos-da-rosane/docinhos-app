import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { AdminNavBar } from "./AdminNavBar"

const mocks = vi.hoisted(() => ({
  sair: vi.fn(),
}))

vi.mock("@/features/auth", () => ({
  useLogoutViewModel: () => ({
    sair: mocks.sair,
  }),
}))

const RouterWrapper = createMemoryRouterWrapper()

describe(AdminNavBar.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve renderizar o cabeçalho quando for exibido", () => {
    render(
      <RouterWrapper>
        <AdminNavBar />
      </RouterWrapper>
    )

    expect(screen.getByText("Docinhos da")).toBeInTheDocument()
    expect(screen.getByText("Rosane")).toBeInTheDocument()
    expect(screen.getByText("área dministrativa")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument()
  })

  it("deve chamar sair quando o botão for clicado", async () => {
    const user = userEvent.setup()

    render(
      <RouterWrapper>
        <AdminNavBar />
      </RouterWrapper>
    )

    await user.click(screen.getByRole("button", { name: "Sair" }))

    expect(mocks.sair).toHaveBeenCalledTimes(1)
  })
})
