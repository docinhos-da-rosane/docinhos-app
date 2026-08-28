import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { estaAutenticado } from "@/shared/services/tokenService"
import { Navigate, Outlet } from "react-router-dom"

export function RotaProtegida() {
  if (!estaAutenticado()) {
    return <Navigate to={ROTAS_COMPLETAS.ADMIN.LOGIN} replace />
  }

  return <Outlet />
}
