import { useQuery } from "@tanstack/react-query"
import { buscarProduto } from "../api/produtoApi"

export function useBuscaProduto(id: string) {
  return useQuery({
    queryKey: ["produto", id],
    queryFn: () => buscarProduto(id),
  })
}
