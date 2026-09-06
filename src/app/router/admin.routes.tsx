import { Navigate, type RouteObject } from "react-router"
import { AdminLayout } from "../layouts/AdminLayout"
import { ProdutoListaPage } from "@/features/produtos"
import { ROTAS } from "@/shared/constants/routes"
import { LoginPage, RotaProtegida } from "@/features/auth"
import { estaAutenticado } from "@/shared/services/tokenService"
import { ProdutoCadastroPage } from "@/features/produtos/pages/ProdutoCadastroPage"

export const adminRoutes: RouteObject = {
  path: ROTAS.ADMIN.ROOT,

  children: [
    {
      index: true,
      element: (
        <Navigate
          to={estaAutenticado() ? ROTAS.ADMIN.PRODUTOS : ROTAS.ADMIN.LOGIN}
          replace
        />
      ),
    },
    {
      path: ROTAS.ADMIN.LOGIN,
      Component: LoginPage,
    },
    {
      Component: RotaProtegida,

      children: [
        {
          Component: AdminLayout,

          children: [
            {
              path: ROTAS.ADMIN.PRODUTOS,
              Component: ProdutoListaPage,
            },
            {
              path: ROTAS.ADMIN.PRODUTOS_CADASTRO,
              Component: ProdutoCadastroPage,
            },
          ],
        },
      ],
    },
  ],
}
