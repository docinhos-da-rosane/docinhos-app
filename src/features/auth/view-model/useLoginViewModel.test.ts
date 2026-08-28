import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { obterErro } from "@/shared/errors/errorService"
import { guardarToken } from "@/shared/services/tokenService"
import { toast } from "sonner"

import { useLoginViewModel } from "./useLoginViewModel"
import { LOGIN_DATA, TOKEN_VALIDO } from "@/test/mocks/authMocks"

const mocks = vi.hoisted(() => ({
  mutateAsync: vi.fn(),
  navigate: vi.fn(),
}))

vi.mock("react-router", () => ({
  useNavigate: () => mocks.navigate,
}))

vi.mock("../hooks/useLogin", () => ({
  useLogin: () => ({
    mutateAsync: mocks.mutateAsync,
    isPending: false,
  }),
}))

vi.mock("@/shared/services/tokenService", () => ({
  guardarToken: vi.fn(),
}))

vi.mock("@/shared/errors/errorService", () => ({
  obterErro: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe(useLoginViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve guardar o token e navegar quando o login for realizado", async () => {
    mocks.mutateAsync.mockResolvedValue({ token: TOKEN_VALIDO })

    const { result } = renderHook(() => useLoginViewModel())

    await act(async () => {
      await result.current.entrar(LOGIN_DATA)
    })

    expect(guardarToken).toHaveBeenCalledWith(TOKEN_VALIDO)
    expect(mocks.navigate).toHaveBeenCalledWith(ROTAS_COMPLETAS.ADMIN.PRODUTOS)
  })

  it("deve exibir uma mensagem quando o login falhar", async () => {
    const erro = new Error("falha")
    const erroApp = { mensagem: "E-mail ou senha inválidos." }

    mocks.mutateAsync.mockRejectedValue(erro)
    vi.mocked(obterErro).mockReturnValue(erroApp as never)

    const { result } = renderHook(() => useLoginViewModel())

    await act(async () => {
      await result.current.entrar(LOGIN_DATA)
    })

    expect(obterErro).toHaveBeenCalledWith(erro)
    expect(toast.error).toHaveBeenCalledWith(erroApp.mensagem)
    expect(guardarToken).not.toHaveBeenCalled()
    expect(mocks.navigate).not.toHaveBeenCalled()
  })
})
