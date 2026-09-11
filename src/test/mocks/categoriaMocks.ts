import type { CategoriaResponse } from "@/features/produtos/models/categoria.types"
import type { Opcao } from "@/shared/models/opcao.types"

export const CATEGORIAS: CategoriaResponse[] = [
  {
    id: "categoria-uuid-1",
    nome: "Brigadeiros",
  },
  {
    id: "categoria-uuid-2",
    nome: "Bolos",
  },
]

export const CATEGORIAS_OPCOES: Opcao[] = [
  {
    valor: "categoria-uuid-1",
    label: "Brigadeiros",
  },
  {
    valor: "categoria-uuid-2",
    label: "Bolos",
  },
]
