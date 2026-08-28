import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { HomePage } from "./HomePage"

describe(HomePage.name, () => {
  it("deve renderizar a página inicial", () => {
    render(<HomePage />)

    expect(screen.getByText("Página Principal")).toBeInTheDocument()
  })
})
