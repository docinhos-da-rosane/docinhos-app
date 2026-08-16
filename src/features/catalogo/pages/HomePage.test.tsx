import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HomePage } from "./HomePage"
import { createQueryWrapper } from "@/test/createQueryWrapper"

describe(HomePage.name, () => {
  it("deve renderizar a página inicial", () => {
    render(<HomePage />, { wrapper: createQueryWrapper() })

    expect(screen.getByText("Página Principal")).toBeInTheDocument()
  })
})
