import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { api } from "@/shared/lib/api.config"
import { createQueryWrapper } from "@/test/createQueryWrapper"

import { useHealthCheck } from "./useHealthCheck"

vi.mock("@/shared/lib/api.config", () => ({
  api: {
    get: vi.fn(),
  },
}))

describe(useHealthCheck.name, () => {
  it("deve retornar o status da aplicação", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        status: "UP",
      },
    })

    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual({
      status: "UP",
    })

    expect(api.get).toHaveBeenCalledWith("/actuator/health")
  })
})
