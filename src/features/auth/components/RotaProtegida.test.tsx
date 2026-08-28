import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { RotaProtegida } from "./RotaProtegida"

const mocks = vi.hoisted(() => ({
  estaAutenticado: vi.fn(),
}))

vi.mock("@/shared/services/tokenService", () => ({
  estaAutenticado: mocks.estaAutenticado,
}))

describe(RotaProtegida.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve renderizar o conteúdo protegido quando estiver autenticado", () => {
    mocks.estaAutenticado.mockReturnValue(true)

    render(
      <MemoryRouter initialEntries={["/admin/produtos"]}>
        <Routes>
          <Route element={<RotaProtegida />}>
            <Route
              path="/admin/produtos"
              element={<span>Produtos protegidos</span>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText("Produtos protegidos")).toBeInTheDocument()
  })

  it("deve redirecionar para o login quando não estiver autenticado", () => {
    mocks.estaAutenticado.mockReturnValue(false)

    render(
      <MemoryRouter initialEntries={["/admin/produtos"]}>
        <Routes>
          <Route element={<RotaProtegida />}>
            <Route
              path="/admin/produtos"
              element={<span>Produtos protegidos</span>}
            />
          </Route>
          <Route path="/admin/login" element={<span>Página de login</span>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText("Página de login")).toBeInTheDocument()
    expect(screen.queryByText("Produtos protegidos")).not.toBeInTheDocument()
  })
})
