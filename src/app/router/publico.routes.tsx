import type { RouteObject } from "react-router"
import { PublicoLayout } from "../layouts/PublicoLayout"
import { CatalogoPage, HomePage } from "@/features/catalogo"

export const publicoRoutes: RouteObject = {
  path: "/",
  Component: PublicoLayout,

  children: [
    {
      index: true,
      Component: HomePage,
    },
    {
      path: "cardapio",
      Component: CatalogoPage,
    },
  ],
}
