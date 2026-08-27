import { Navigate, type RouteObject } from "react-router"
import { AdminLayout } from "../layouts/AdminLayout"
import { LoginPage } from "@/features/auth"
import { ProdutoListaPage } from "@/features/produtos"
import { ROTAS } from "@/shared/constants/routes"

export const adminRoutes: RouteObject = {
  path: ROTAS.ADMIN.ROOT,

  children: [
    {
      index: true,
      element: <Navigate to="login" replace />,
    },
    {
      path: ROTAS.ADMIN.LOGIN,
      Component: LoginPage,
    },

    {
      Component: AdminLayout,

      children: [
        {
          path: ROTAS.ADMIN.PRODUTOS,
          Component: ProdutoListaPage,
        },
      ],
    },
  ],
}
