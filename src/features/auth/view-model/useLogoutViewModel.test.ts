import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { removerToken } from "@/shared/services/tokenService"

import { useLogoutViewModel } from "./useLogoutViewModel"

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
}))

vi.mock("react-router-dom", () => ({
  useNavigate: () => mocks.navigate,
}))

vi.mock("@/shared/services/tokenService", () => ({
  removerToken: vi.fn(),
}))

describe(useLogoutViewModel.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve remover o token e navegar para o login quando sair", () => {
    const { result } = renderHook(() => useLogoutViewModel())

    result.current.sair()

    expect(removerToken).toHaveBeenCalledTimes(1)
    expect(mocks.navigate).toHaveBeenCalledWith(ROTAS_COMPLETAS.ADMIN.LOGIN, {
      replace: true,
    })
  })
})
