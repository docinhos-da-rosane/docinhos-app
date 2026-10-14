import { MemoryRouter as ComponentMemoryRouter } from "react-router"
import { MemoryRouter as NavigationMemoryRouter } from "react-router-dom"
import type { PropsWithChildren } from "react"

export function createMemoryRouterWrapper(initialEntries: string[] = ["/"]) {
  return function MemoryRouterWrapper({ children }: PropsWithChildren) {
    return (
      <NavigationMemoryRouter initialEntries={initialEntries}>
        <ComponentMemoryRouter initialEntries={initialEntries}>
          {children}
        </ComponentMemoryRouter>
      </NavigationMemoryRouter>
    )
  }
}
