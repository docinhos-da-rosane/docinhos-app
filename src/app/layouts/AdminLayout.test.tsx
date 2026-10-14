import { render, screen } from "@testing-library/react"
import { Route, Routes } from "react-router"
import { describe, expect, it, vi } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { AdminLayout } from "./AdminLayout"

vi.mock("@/shared/components/layout/header/AdminNavBar", () => ({
  AdminNavBar: () => <h1>Docinhos da Rosane</h1>,
}))

describe(AdminLayout.name, () => {
  it("deve renderizar o layout administrativo e o conteúdo da rota filha", () => {
    const RouterWrapper = createMemoryRouterWrapper()

    render(
      <RouterWrapper>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<p>Conteúdo administrativo</p>} />
          </Route>
        </Routes>
      </RouterWrapper>
    )

    expect(
      screen.getByRole("heading", { name: "Docinhos da Rosane" })
    ).toBeInTheDocument()

    expect(screen.getByText("Conteúdo administrativo")).toBeInTheDocument()
  })
})
