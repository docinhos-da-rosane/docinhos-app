import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useBuscaProduto } from "../hooks/useBuscaProduto"
import { obterErro } from "@/shared/errors/errorService"
import type { ProdutoDetalhadoResponse } from "../models/produto.types"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { useAlterarDisponibilidadeProduto } from "../hooks/useAlterarDisponibilidadeProduto"
import { useExcluirProduto } from "../hooks/useExcluirProduto"
import type { AcaoConfirmarDialog } from "@/shared/models/acao.type"
import { CodeError } from "@/shared/errors/error.enum"

interface UseProdutoViewModelResult {
  produto: ProdutoDetalhadoResponse
  carregando: boolean
  acaoDisponibilidade: AcaoConfirmarDialog
  acaoExclusao: AcaoConfirmarDialog
}

interface ConfirmacaoDisponibilidade {
  id: string
  disponivel: boolean
}

interface ConfirmacaoExclusao {
  id: string
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
  const excluirProdutoQuery = useExcluirProduto()

  const [confirmacaoDisponibilidade, setConfirmacaoDisponibilidade] =
    useState<ConfirmacaoDisponibilidade | null>(null)
  const [confirmacaoExclusao, setConfirmacaoExclusao] =
    useState<ConfirmacaoExclusao | null>(null)

  const produto = produtoQuery.data ?? PRODUTO_VAZIO

  const acaoDisponibilidade: AcaoConfirmarDialog = {
    aberto: !!confirmacaoDisponibilidade,
    carregando: alterarDisponibilidadeQuery.isPending,
    texto: produto.disponivel
      ? "Deseja marcar este produto como indisponível?"
      : "Deseja marcar este produto como disponível?",
    onAbrir: abrirConfirmacaoDisponibilidade,
    onFechar: cancelarConfirmacaoDisponibilidade,
    onConfirmar: confirmarDisponibilidade,
  }

  const acaoExclusao: AcaoConfirmarDialog = {
    aberto: !!confirmacaoExclusao,
    carregando: excluirProdutoQuery.isPending,
    texto: "Deseja excluir este produto? Essa ação não poderá ser desfeita.",
    onAbrir: abrirConfirmacaoExclusao,
    onFechar: fecharConfirmacaoExclusao,
    onConfirmar: confirmarExclusao,
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
    setConfirmacaoDisponibilidade({
      id: produto.id,
      disponivel: !produto.disponivel,
    })
  }

  function cancelarConfirmacaoDisponibilidade() {
    setConfirmacaoDisponibilidade(null)
  }

  async function confirmarDisponibilidade() {
    if (!confirmacaoDisponibilidade) return

    try {
      await alterarDisponibilidadeQuery.mutateAsync(confirmacaoDisponibilidade)
      toast.success("Produto atualizado com sucesso!")
    } catch (erro: unknown) {
      const erroApp = obterErro(erro)
      toast.error(erroApp.mensagem)
    } finally {
      setConfirmacaoDisponibilidade(null)
    }
  }

  function abrirConfirmacaoExclusao() {
    setConfirmacaoExclusao({ id: produto.id })
  }

  function fecharConfirmacaoExclusao() {
    setConfirmacaoExclusao(null)
  }

  async function confirmarExclusao() {
    if (!confirmacaoExclusao) return

    try {
      await excluirProdutoQuery.mutateAsync(confirmacaoExclusao.id)
      toast.success("Produto excluído com sucesso!")
      navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS, { replace: true })
    } catch (erro: unknown) {
      const erroApp = obterErro(erro)
      toast.error(erroApp.mensagem)

      if (erroApp.codeError === CodeError.NAO_ENCONTRADO) {
        navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS, { replace: true })
      }
    } finally {
      setConfirmacaoExclusao(null)
    }
  }

  return {
    produto,
    carregando: produtoQuery.isLoading,
    acaoDisponibilidade,
    acaoExclusao,
  }
}
