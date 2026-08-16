import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { HomePage } from "./HomePage"

vi.mock("@/shared/hooks/health-check/useHealthCheck", () => ({
  useHealthCheck: () => ({ data: null, error: null, isPending: false }),
}))

describe(HomePage.name, () => {
  it("deve renderizar a página inicial", () => {
    render(<HomePage />)

    expect(screen.getByText("Página Principal")).toBeInTheDocument()
  })
})
