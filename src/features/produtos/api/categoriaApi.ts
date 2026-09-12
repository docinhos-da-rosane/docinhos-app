import { apiPublica } from "@/shared/lib/api.config"
import type { CategoriaResponse } from "../models/categoria.types"

export async function buscarCategorias(): Promise<CategoriaResponse[]> {
  return await apiPublica
    .get<CategoriaResponse[]>("/categorias")
    .then((response) => response.data)
}
