import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import { describe, expect, it } from "vitest"

import { PublicoLayout } from "./PublicoLayout"

describe(PublicoLayout.name, () => {
  it("deve renderizar o layout público e o conteúdo da rota filha", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <PublicoLayout />,
        children: [
          {
            index: true,
            element: <p>Conteúdo público</p>,
          },
        ],
      },
    ])

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole("heading", { name: "Layout publico" })
    ).toBeInTheDocument()

    expect(screen.getByText("Conteúdo público")).toBeInTheDocument()
  })
})
