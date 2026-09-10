import type { Opcao } from "@/shared/models/opcao.types"
import type { CategoriaResponse } from "../models/categoria.types"

export function toOpcao(categoria: CategoriaResponse): Opcao {
  return {
    valor: categoria.id,
    label: categoria.nome,
  }
}
