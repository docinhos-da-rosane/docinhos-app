import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import { describe, expect, it, vi } from "vitest"

import { AdminLayout } from "./AdminLayout"

vi.mock("@/shared/components/layout/header/AdminNavBar", () => ({
  AdminNavBar: () => <h1>Docinhos da Rosane</h1>,
}))

describe(AdminLayout.name, () => {
  it("deve renderizar o layout administrativo e o conteúdo da rota filha", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <p>Conteúdo administrativo</p>,
          },
        ],
      },
    ])

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole("heading", { name: "Docinhos da Rosane" })
    ).toBeInTheDocument()

    expect(screen.getByText("Conteúdo administrativo")).toBeInTheDocument()
  })
})
