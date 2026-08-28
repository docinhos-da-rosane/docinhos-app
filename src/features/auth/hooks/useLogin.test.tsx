import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"
import { LOGIN_DATA, TOKEN_VALIDO } from "@/test/mocks/authMocks"

import { useLogin } from "./useLogin"

const mocks = vi.hoisted(() => ({
  login: vi.fn(),
}))

vi.mock("../api/authApi", () => ({
  login: mocks.login,
}))

describe(useLogin.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve retornar os dados quando o login for concluído", async () => {
    const resposta = { token: TOKEN_VALIDO }
    mocks.login.mockResolvedValue(resposta)

    const { result } = renderHook(() => useLogin(), {
      wrapper: createQueryWrapper(),
    })

    await expect(result.current.mutateAsync(LOGIN_DATA)).resolves.toEqual(
      resposta
    )

    expect(mocks.login).toHaveBeenCalled()
    expect(mocks.login.mock.calls[0][0]).toEqual(LOGIN_DATA)
  })

  it("deve propagar o erro quando o login falhar", async () => {
    const erro = new Error("Falha no login")
    mocks.login.mockRejectedValue(erro)

    const { result } = renderHook(() => useLogin(), {
      wrapper: createQueryWrapper(),
    })

    await expect(result.current.mutateAsync(LOGIN_DATA)).rejects.toThrow(
      "Falha no login"
    )
  })
})
