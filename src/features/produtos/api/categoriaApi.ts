import { apiProtegida } from "@/shared/lib/api.config"
import type { CategoriaResponse } from "../models/categoria.types"

export async function buscarCategorias(): Promise<CategoriaResponse[]> {
  return await apiProtegida
    .get<CategoriaResponse[]>("/admin/categorias")
    .then((response) => response.data)
}
