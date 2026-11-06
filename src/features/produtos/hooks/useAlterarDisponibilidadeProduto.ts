import { useMutation, useQueryClient } from "@tanstack/react-query"
import { alterarDisponibilidadeProduto } from "../api/produtoApi"

interface AlterarDisponibilidadeParams {
  id: string
  disponivel: boolean
}

export function useAlterarDisponibilidadeProduto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, disponivel }: AlterarDisponibilidadeParams) =>
      alterarDisponibilidadeProduto(id, disponivel),
    retry: false,
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
