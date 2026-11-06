import { useMutation, useQueryClient } from "@tanstack/react-query"
import { atualizarProduto } from "../api/produtoApi"

interface EditarProdutoParams {
  id: string
  data: FormData
}

export function useEditarProduto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: EditarProdutoParams) =>
      atualizarProduto(id, data),
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["produto", id],
          exact: true,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({ queryKey: ["produtos"] }),
      ])
    },
  })
}
