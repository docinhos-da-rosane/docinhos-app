import { useQuery } from "@tanstack/react-query"
import { buscarCategorias } from "../api/categoriaApi"

export function useBuscarCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: buscarCategorias,
  })
}
