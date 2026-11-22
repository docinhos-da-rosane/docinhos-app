import type { RouteObject } from "react-router"
import { PublicoLayout } from "../layouts/PublicoLayout"
import { CatalogoPage, HomePage } from "@/features/catalogo"
import { ROTAS } from "@/shared/constants/routes"

export const publicoRoutes: RouteObject = {
  path: "/",
  Component: PublicoLayout,

  children: [
    {
      index: true,
      Component: HomePage,
    },
    {
      path: ROTAS.CATALOGO,
      Component: CatalogoPage,
    },
  ],
}
