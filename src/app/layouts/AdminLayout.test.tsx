import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import { describe, expect, it } from "vitest"

import { AdminLayout } from "./AdminLayout"

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
      screen.getByRole("heading", { name: "Layout administrativo" })
    ).toBeInTheDocument()

    expect(screen.getByText("Conteúdo administrativo")).toBeInTheDocument()
  })
})
