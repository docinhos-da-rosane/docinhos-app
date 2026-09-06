export const ROTAS = {
  HOME: "/",
  CATALOGO: "catalogo",

  ADMIN: {
    ROOT: "admin",
    LOGIN: "login",
    PRODUTOS: "produtos",
    DESTAQUES: "destaques",
    PRODUTOS_CADASTRO: "produtos/cadastro",
  },
} as const

export const ROTAS_COMPLETAS = {
  HOME: ROTAS.HOME,
  CATALOGO: `/${ROTAS.CATALOGO}`,

  ADMIN: {
    ROOT: `/${ROTAS.ADMIN.ROOT}`,
    LOGIN: `/${ROTAS.ADMIN.ROOT}/${ROTAS.ADMIN.LOGIN}`,
    PRODUTOS: `/${ROTAS.ADMIN.ROOT}/${ROTAS.ADMIN.PRODUTOS}`,
    DESTAQUES: `/${ROTAS.ADMIN.ROOT}/${ROTAS.ADMIN.DESTAQUES}`,
    PRODUTOS_CADASTRO: `/${ROTAS.ADMIN.ROOT}/${ROTAS.ADMIN.PRODUTOS_CADASTRO}`,
  },
} as const
