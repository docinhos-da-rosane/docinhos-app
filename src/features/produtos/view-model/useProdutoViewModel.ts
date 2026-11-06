import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useBuscaProduto } from "../hooks/useBuscaProduto"
import { obterErro } from "@/shared/errors/errorService"
import type { ProdutoDetalhadoResponse } from "../models/produto.types"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { useAlterarDisponibilidadeProduto } from "../hooks/useAlterarDisponibilidadeProduto"
import type { AcaoConfirmarDialog } from "@/shared/models/acao.type"

interface UseProdutoViewModelResult {
  produto: ProdutoDetalhadoResponse
  carregando: boolean
  acaoDisponibilidade: AcaoConfirmarDialog
}

interface ConfirmacaoDisponibilidade {
  id: string
  disponivel: boolean
}

const PRODUTO_VAZIO: ProdutoDetalhadoResponse = {
  id: "",
  nome: "",
  descricao: "",
  categoria: {
    id: "",
    nome: "",
  },
  disponivel: false,
  imagemUrl: "",
  porcoes: [],
}

export function useProdutoViewModel(
  id: string = ""
): UseProdutoViewModelResult {
  const navigate = useNavigate()
  const produtoQuery = useBuscaProduto(id)
  const alterarDisponibilidadeQuery = useAlterarDisponibilidadeProduto()
  const [confirmacao, setConfirmacao] =
    useState<ConfirmacaoDisponibilidade | null>(null)
  const produto = produtoQuery.data ?? PRODUTO_VAZIO

  const acaoDisponibilidade: AcaoConfirmarDialog = {
    aberto: !!confirmacao,
    carregando: alterarDisponibilidadeQuery.isPending,
    texto: produto.disponivel
      ? "Deseja marcar este produto como indisponível?"
      : "Deseja marcar este produto como disponível?",
    onAbrir: abrirConfirmacaoDisponibilidade,
    onFechar: cancelarConfirmacaoDisponibilidade,
    onConfirmar: confirmarDisponibilidade,
  }

  useEffect(() => {
    if (!produtoQuery.isError) {
      return
    }

    const erroApp = obterErro(produtoQuery.error)
    toast.error(erroApp.mensagem)
    navigate(ROTAS_COMPLETAS.ADMIN.ROOT, { replace: true })
  }, [navigate, produtoQuery.error, produtoQuery.isError])

  function abrirConfirmacaoDisponibilidade() {
    setConfirmacao({ id: produto.id, disponivel: !produto.disponivel })
  }

  function cancelarConfirmacaoDisponibilidade() {
    setConfirmacao(null)
  }

  async function confirmarDisponibilidade() {
    if (!confirmacao) return

    try {
      await alterarDisponibilidadeQuery.mutateAsync(confirmacao)
      toast.success("Produto atualizado com sucesso!")
    } catch (erro: unknown) {
      const erroApp = obterErro(erro)
      toast.error(erroApp.mensagem)
    } finally {
      setConfirmacao(null)
    }
  }

  return {
    produto,
    carregando: produtoQuery.isLoading,
    acaoDisponibilidade,
  }
}
