import type { Opcao } from "@/shared/models/opcao.types"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { useEffect } from "react"
import { toOpcao } from "../mapper/categoria.mapper.ts"
import { useBuscarCategorias } from "../hooks/useBuscaCategorias.ts"

interface UseOpcoesViewModelResult {
  categoriasOpcoes: Opcao[]
  carregando: boolean
}

export function useOpcoesViewModel(): UseOpcoesViewModelResult {
  const navigate = useNavigate()
  const categoriasQuery = useBuscarCategorias()

  const categoriasOpcoes =
    categoriasQuery.data?.map((categoria) => toOpcao(categoria)) ?? []

  useEffect(() => {
    if (!categoriasQuery.isError) {
      return
    }

    const erroApp = obterErro(categoriasQuery.error)
    toast.error(erroApp.mensagem)

    navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS, { replace: true })
  }, [categoriasQuery.isError, categoriasQuery.error, navigate])

  return {
    categoriasOpcoes,
    carregando: categoriasQuery.isLoading,
  }
}
