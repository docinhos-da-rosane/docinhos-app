import { useNavigate } from "react-router"
import { useLogin } from "../hooks/useLogin"
import type { LoginRequest } from "../models/auth.types"
import { guardarToken } from "@/shared/services/tokenService"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"

interface UseLoginViewModelResult {
  entrar: (dados: LoginRequest) => Promise<void>
  carregando: boolean
}

export function useLoginViewModel(): UseLoginViewModelResult {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  async function entrar(dados: LoginRequest) {
    try {
      const response = await loginMutation.mutateAsync(dados)

      guardarToken(response.token)
      navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS)
    } catch (erro: unknown) {
      const erroApp = obterErro(erro)
      toast.error(erroApp.mensagem)
    }
  }

  return {
    entrar,
    carregando: loginMutation.isPending,
  }
}
