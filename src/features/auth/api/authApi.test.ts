import { beforeEach, describe, expect, it, vi } from "vitest"

import { api } from "@/shared/lib/api.config"

import { login } from "./authApi"
import { LOGIN_DATA, TOKEN_VALIDO } from "@/test/mocks/authMocks"

vi.mock("@/shared/lib/api.config", () => ({
  api: {
    post: vi.fn(),
  },
}))

describe(login.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve retornar os dados da resposta quando o login for realizado", async () => {
    const dados = LOGIN_DATA

    const resposta = {
      token: TOKEN_VALIDO,
    }

    vi.mocked(api.post).mockResolvedValue({
      data: resposta,
    } as any)

    await expect(login(dados)).resolves.toEqual(resposta)
    expect(api.post).toHaveBeenCalledWith("/auth/login", dados)
  })
})
