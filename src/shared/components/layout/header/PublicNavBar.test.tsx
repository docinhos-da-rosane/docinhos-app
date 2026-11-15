import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { PublicNavBar } from "./PublicNavBar"
import { ROTAS } from "@/shared/constants/routes"

const RouterWrapper = createMemoryRouterWrapper()

describe(PublicNavBar.name, () => {
  it("deve exibir a marca e os links da navegação pública", () => {
    render(
      <RouterWrapper>
        <PublicNavBar />
      </RouterWrapper>
    )

    expect(
      screen.getByRole("heading", { name: "Docinhos da Rosane" })
    ).toBeInTheDocument()
    expect(screen.getByText("Docinhos sob encomenda")).toBeInTheDocument()

    const navigation = screen.getByRole("navigation")
    expect(
      within(navigation).getByRole("link", { name: "Início" })
    ).toHaveAttribute("href", ROTAS.HOME)
    expect(
      within(navigation).getByRole("link", { name: "Catálogo" })
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole("link", { name: "Como encomendar" })
    ).toBeInTheDocument()
  })

  it("deve abrir o menu mobile e exibir seus links", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RouterWrapper>
        <PublicNavBar />
      </RouterWrapper>
    )

    const menuTrigger = container.querySelector<HTMLElement>(
      '[data-slot="sheet-trigger"]'
    )
    if (menuTrigger === null) {
      throw new Error("O botão para abrir o menu mobile não foi renderizado")
    }
    await user.click(menuTrigger)

    const dialog = await screen.findByRole("dialog")
    const mobileNavigation = within(dialog).getByRole("navigation")

    expect(
      within(mobileNavigation).getByRole("link", { name: "Início" })
    ).toBeInTheDocument()
    expect(
      within(mobileNavigation).getByRole("link", { name: "Catálogo" })
    ).toBeInTheDocument()
    expect(
      within(mobileNavigation).getByRole("link", { name: "Como encomendar" })
    ).toBeInTheDocument()
  })
})
