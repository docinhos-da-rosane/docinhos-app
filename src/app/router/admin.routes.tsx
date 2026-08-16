import { Navigate, type RouteObject } from "react-router"
import { AdminLayout } from "../layouts/AdminLayout"
import { LoginPage } from "@/features/auth"
import { ProdutoListaPage } from "@/features/produtos"

export const adminRoutes: RouteObject = {
  path: "/admin",

  children: [
    {
      index: true,
      element: <Navigate to="login" replace />,
    },
    {
      path: "login",
      Component: LoginPage,
    },

    {
      Component: AdminLayout,

      children: [
        {
          path: "produtos",
          Component: ProdutoListaPage,
        },
      ],
    },
  ],
}
