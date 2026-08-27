import axios from "axios"
import type { ErrorApp, ErrorResponse } from "./error.types"
import { CodeError } from "./error.enum"

export function obterErro(erro: unknown): ErrorApp {
  const codigo = extrairCodigoErro(erro)
  return montarErroApp(codigo)
}

export function extrairCodigoErro(error: unknown): CodeError {
  if (!axios.isAxiosError<ErrorResponse>(error)) {
    return CodeError.ERRO_NAO_ESPECIFICADO
  }

  return error.response?.data?.codeError ?? CodeError.ERRO_NAO_ESPECIFICADO
}

export function montarErroApp(codigo: CodeError): ErrorApp {
  const errorApi: ErrorApp = {
    codeError: codigo,
    mensagem: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
  }

  switch (codigo) {
    case CodeError.CREDENCIAIS_INVALIDAS:
      errorApi.mensagem = "E-mail ou senha inválidos."
      break

    case CodeError.DADOS_INVALIDOS:
      errorApi.mensagem = "Verifique os dados informados."
      break

    case CodeError.NAO_ENCONTRADO:
      errorApi.mensagem = "Não foi possível encontrar o recurso solicitado."
      break

    case CodeError.ERRO_INTERNO:
      errorApi.mensagem =
        "Ocorreu um erro interno no servidor. Tente novamente mais tarde."
      break

    case CodeError.ERRO_NAO_ESPECIFICADO:
      errorApi.mensagem =
        "Ocorreu um erro inesperado. Tente novamente mais tarde."
      break
  }

  return errorApi
}
