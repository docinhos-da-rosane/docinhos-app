import axios from "axios"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { CodeError } from "./error.enum"
import { extrairCodigoErro, montarErroApp, obterErro } from "./errorService"

describe(obterErro.name, () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("deve retornar erro genérico quando o erro não for do Axios", () => {
    expect(obterErro(new Error("Falha"))).toEqual({
      codeError: CodeError.ERRO_NAO_ESPECIFICADO,
      mensagem: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    })
  })

  it("deve retornar a mensagem correspondente quando receber um erro da API", () => {
    vi.spyOn(axios, "isAxiosError").mockReturnValue(true)

    const erro = {
      response: {
        data: {
          codeError: CodeError.CREDENCIAIS_INVALIDAS,
        },
      },
    }

    expect(obterErro(erro)).toEqual({
      codeError: CodeError.CREDENCIAIS_INVALIDAS,
      mensagem: "E-mail ou senha inválidos.",
    })
  })
})

describe(extrairCodigoErro.name, () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("deve retornar o código da API quando o erro possuir uma resposta", () => {
    vi.spyOn(axios, "isAxiosError").mockReturnValue(true)

    const erro = {
      response: {
        data: {
          codeError: CodeError.DADOS_INVALIDOS,
        },
      },
    }

    expect(extrairCodigoErro(erro)).toBe(CodeError.DADOS_INVALIDOS)
  })

  it("deve retornar o código genérico quando o erro não possuir uma resposta", () => {
    vi.spyOn(axios, "isAxiosError").mockReturnValue(true)

    expect(extrairCodigoErro({})).toBe(CodeError.ERRO_NAO_ESPECIFICADO)
  })
})

describe(montarErroApp.name, () => {
  it.each([
    [CodeError.CREDENCIAIS_INVALIDAS, "E-mail ou senha inválidos."],
    [CodeError.DADOS_INVALIDOS, "Verifique os dados informados."],
    [
      CodeError.NAO_ENCONTRADO,
      "Não foi possível encontrar o recurso solicitado.",
    ],
    [
      CodeError.ERRO_INTERNO,
      "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
    ],
    [
      CodeError.ERRO_NAO_ESPECIFICADO,
      "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    ],
  ])(
    "deve retornar a mensagem correta quando o código for %s",
    (codigo, mensagem) => {
      expect(montarErroApp(codigo)).toEqual({
        codeError: codigo,
        mensagem,
      })
    }
  )
})
