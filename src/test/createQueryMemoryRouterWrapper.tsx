import type { PropsWithChildren } from "react"

import { createMemoryRouterWrapper } from "./createMemoryRouterWrapper"
import { createQueryWrapper } from "./createQueryWrapper"

export function createQueryMemoryRouterWrapper(
  initialEntries: string[] = ["/"]
) {
  const QueryWrapper = createQueryWrapper()
  const RouterWrapper = createMemoryRouterWrapper(initialEntries)

  return function QueryMemoryRouterWrapper({ children }: PropsWithChildren) {
    return (
      <QueryWrapper>
        <RouterWrapper>{children}</RouterWrapper>
      </QueryWrapper>
    )
  }
}
