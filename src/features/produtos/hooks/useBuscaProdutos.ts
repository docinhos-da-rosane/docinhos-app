import { useQuery } from "@tanstack/react-query"
import { buscarProdutos } from "../api/produtoApi"

export function useBuscarProdutos(page: number) {
  return useQuery({
    queryKey: ["produtos", page],
    queryFn: () => buscarProdutos(page),
    staleTime: 0,
  })
}
