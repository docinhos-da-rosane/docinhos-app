import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { removerToken } from "@/shared/services/tokenService"
import { useNavigate } from "react-router-dom"

interface UseLogoutViewModelResult {
  sair: () => void
}

export function useLogoutViewModel(): UseLogoutViewModelResult {
  const navigate = useNavigate()

  function sair() {
    removerToken()
    navigate(ROTAS_COMPLETAS.ADMIN.LOGIN, { replace: true })
  }

  return {
    sair,
  }
}
