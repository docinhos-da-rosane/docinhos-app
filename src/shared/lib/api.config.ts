import axios from "axios"
import { toast } from "sonner"
import { extrairCodigoErro } from "../errors/errorService"
import { CodeError } from "../errors/error.enum"
import { ROTAS_COMPLETAS } from "../constants/routes"
import { obterToken, removerToken } from "@/shared/services/tokenService"

export const BASE_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
      removerToken()
      toast.error("Sua sessão expirou. Entre novamente.")
      window.location.href = ROTAS_COMPLETAS.ADMIN.LOGIN
    }

    return Promise.reject(error)
  }
)
