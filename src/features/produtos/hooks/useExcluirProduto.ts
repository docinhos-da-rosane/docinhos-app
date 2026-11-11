import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { excluirProduto } from "../api/produtoApi"

export function useExcluirProduto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => excluirProduto(id),
    retry: false,
    onSuccess: async (_, id) => removerCacheProduto(queryClient, id),
    onError: async (error, id) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        await removerCacheProduto(queryClient, id)
      }
    },
  })
}

async function removerCacheProduto(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string
) {
  await Promise.all([
    queryClient.cancelQueries({ queryKey: ["produto", id], exact: true }),
    queryClient.cancelQueries({ queryKey: ["produtos"] }),
  ])

  queryClient.removeQueries({ queryKey: ["produto", id], exact: true })
  queryClient.removeQueries({ queryKey: ["produtos"] })
}
