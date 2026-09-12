import { beforeEach, describe, expect, it, vi } from "vitest"

import { apiPublica } from "@/shared/lib/api.config"

import { login } from "./authApi"
import { LOGIN_DATA, TOKEN_VALIDO } from "@/test/mocks/authMocks"

vi.mock("@/shared/lib/api.config", () => ({
  apiPublica: {
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

    vi.mocked(apiPublica.post).mockResolvedValue({
      data: resposta,
    } as any)

    await expect(login(dados)).resolves.toEqual(resposta)
    expect(apiPublica.post).toHaveBeenCalledWith("/auth/login", dados)
  })
})
