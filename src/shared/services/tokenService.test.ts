import { beforeEach, describe, expect, it } from "vitest"

import {
  estaAutenticado,
  guardarToken,
  obterToken,
  removerToken,
} from "./tokenService"
import { TOKEN_VALIDO } from "@/test/mocks/authMocks"

describe("tokenService", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("deve guardar o token quando receber um token válido", () => {
    guardarToken(TOKEN_VALIDO)

    expect(localStorage.getItem("access_token")).toBe(TOKEN_VALIDO)
  })

  it("deve retornar o token quando existir um token armazenado", () => {
    localStorage.setItem("access_token", TOKEN_VALIDO)

    expect(obterToken()).toBe(TOKEN_VALIDO)
  })

  it("deve retornar nulo quando não existir um token armazenado", () => {
    expect(obterToken()).toBeNull()
  })

  it("deve remover o token quando solicitar a remoção", () => {
    guardarToken("token-valido")

    removerToken()

    expect(obterToken()).toBeNull()
  })

  it("deve retornar verdadeiro quando existir um token", () => {
    guardarToken("token-valido")

    expect(estaAutenticado()).toBe(true)
  })

  it("deve retornar falso quando não existir um token", () => {
    expect(estaAutenticado()).toBe(false)
  })
})
