import { useMutation } from "@tanstack/react-query"
import { cadastrarProduto } from "../api/produtoApi"

export function useCadastrarProduto() {
  return useMutation({ mutationFn: cadastrarProduto })
}
