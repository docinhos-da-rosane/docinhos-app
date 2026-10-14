import { render, screen } from "@testing-library/react"
import { Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { RotaProtegida } from "./RotaProtegida"

const mocks = vi.hoisted(() => ({
  estaAutenticado: vi.fn(),
}))

vi.mock("@/shared/services/tokenService", () => ({
  estaAutenticado: mocks.estaAutenticado,
}))

const RouterWrapper = createMemoryRouterWrapper(["/admin/produtos"])

describe(RotaProtegida.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve renderizar o conteúdo protegido quando estiver autenticado", () => {
    mocks.estaAutenticado.mockReturnValue(true)

    render(
      <RouterWrapper>
        <Routes>
          <Route element={<RotaProtegida />}>
            <Route
              path="/admin/produtos"
              element={<span>Produtos protegidos</span>}
            />
          </Route>
        </Routes>
      </RouterWrapper>
    )

    expect(screen.getByText("Produtos protegidos")).toBeInTheDocument()
  })

  it("deve redirecionar para o login quando não estiver autenticado", () => {
    mocks.estaAutenticado.mockReturnValue(false)

    render(
      <RouterWrapper>
        <Routes>
          <Route element={<RotaProtegida />}>
            <Route
              path="/admin/produtos"
              element={<span>Produtos protegidos</span>}
            />
          </Route>
          <Route path="/admin/login" element={<span>Página de login</span>} />
        </Routes>
      </RouterWrapper>
    )

    expect(screen.getByText("Página de login")).toBeInTheDocument()
    expect(screen.queryByText("Produtos protegidos")).not.toBeInTheDocument()
  })
})
