import { api } from "@/shared/lib/api.config"
import type { CategoriaResponse } from "../models/categoria.types"

export async function buscarCategorias(): Promise<CategoriaResponse[]> {
  return await api
    .get<CategoriaResponse[]>("/categorias")
    .then((response) => response.data)
}
