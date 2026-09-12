import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { apiProtegida } from "@/shared/lib/api.config"
import { createQueryWrapper } from "@/test/createQueryWrapper"

import { useHealthCheck } from "./useHealthCheck"

vi.mock("@/shared/lib/api.config", () => ({
  apiProtegida: {
    get: vi.fn(),
  },
}))

describe(useHealthCheck.name, () => {
  it("deve retornar o status da aplicação", async () => {
    vi.mocked(apiProtegida.get).mockResolvedValue({
      data: {
        status: "UP",
      },
    } as any)

    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual({
      status: "UP",
    })

    expect(apiProtegida.get).toHaveBeenCalledWith("/actuator/health")
  })
})
