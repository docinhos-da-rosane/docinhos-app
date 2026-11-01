import { useMutation, useQueryClient } from "@tanstack/react-query"
import { atualizarProduto } from "../api/produtoApi"

export function useEditarProduto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
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
