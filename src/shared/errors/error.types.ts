import type { CodeError } from "./error.enum"

export interface ErrorResponse {
  timestamp: string
  codeError: CodeError
  mensagem: string
  path: string
}

export interface ErrorApp {
  codeError: CodeError
  mensagem: string
}
