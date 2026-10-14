import { render, screen } from "@testing-library/react"
import { Route, Routes } from "react-router"
import { describe, expect, it } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { PublicoLayout } from "./PublicoLayout"

describe(PublicoLayout.name, () => {
  it("deve renderizar o layout público e o conteúdo da rota filha", () => {
    const RouterWrapper = createMemoryRouterWrapper()

    render(
      <RouterWrapper>
        <Routes>
          <Route path="/" element={<PublicoLayout />}>
            <Route index element={<p>Conteúdo público</p>} />
          </Route>
        </Routes>
      </RouterWrapper>
    )

    expect(
      screen.getByRole("heading", { name: "Layout publico" })
    ).toBeInTheDocument()

    expect(screen.getByText("Conteúdo público")).toBeInTheDocument()
  })
})
