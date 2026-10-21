import { useEffect } from "react"
import { toast } from "sonner"

import { useBuscaProduto } from "../hooks/useBuscaProduto"
import { obterErro } from "@/shared/errors/errorService"
import type { ProdutoDetalhadoResponse } from "../models/produto.types"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"

export function useProdutoViewModel(id: string = "") {
  const navigate = useNavigate()

  const produtoQuery = useBuscaProduto(id)
  const produtoPadrao: ProdutoDetalhadoResponse = {
    id: "",
    nome: "",
    descricao: "",
    categoria: "",
    disponivel: false,
    imagemUrl: "",
    porcoes: [],
  }

  useEffect(() => {
    if (!produtoQuery.isError) {
      return
    }

    const erroApp = obterErro(produtoQuery.error)
    toast.error(erroApp.mensagem)
    navigate(ROTAS_COMPLETAS.ADMIN.ROOT, { replace: true })
  }, [navigate, produtoQuery.error, produtoQuery.isError])

  return {
    produto: produtoQuery.data || produtoPadrao,
    carregando: produtoQuery.isLoading,
  }
}
