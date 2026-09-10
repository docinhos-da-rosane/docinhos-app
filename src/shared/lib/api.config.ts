import axios from "axios"
import { extrairCodigoErro } from "../errors/errorService"
import { CodeError } from "../errors/error.enum"
import { obterToken } from "@/shared/services/tokenService"
import { limpaSessaoENotifica } from "../services/sessaoService"

export const BASE_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080"

export const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = obterToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const codigoErro = extrairCodigoErro(error)

    if (codigoErro === CodeError.CREDENCIAIS_EXPIRADAS) {
      limpaSessaoENotifica()
    }

    return Promise.reject(error)
  }
)
