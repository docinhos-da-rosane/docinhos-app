import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { setSessaoExpiradaHandler } from "@/shared/services/sessaoService"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function SessaoWatcher() {
  const navigate = useNavigate()

  useEffect(() => {
    setSessaoExpiradaHandler(() => {
      navigate(ROTAS_COMPLETAS.ADMIN.LOGIN, { replace: true })
    })

    return () => {
      setSessaoExpiradaHandler(() => {})
    }
  }, [navigate])

  return null
}
