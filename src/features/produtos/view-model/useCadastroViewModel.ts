import type { ProdutoFormData } from "../schemas/produto.schema"
import { useCadastrarProduto } from "../hooks/useCadastrarProduto.ts"
import { toCriarProdutoFormData } from "../mapper/produto.mapper"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"

interface UseCadastroViewModelResult {
  cadastrar(dados: ProdutoFormData): Promise<void>
  carregando: boolean
}

export function useCadastroViewModel(): UseCadastroViewModelResult {
  const navigate = useNavigate()
  const cadastrarMutation = useCadastrarProduto()

  async function cadastrar(dados: ProdutoFormData) {
    try {
      const request = toCriarProdutoFormData(dados)
      await cadastrarMutation.mutateAsync(request)
      toast.success("Produto cadastrado com sucesso!")
    } catch (erro: unknown) {
      const erroApp = obterErro(erro)
      toast.error(erroApp.mensagem)
    } finally {
      navegarParaProdutos()
    }
  }

  function navegarParaProdutos() {
    navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS, { replace: true })
  }

  return {
    cadastrar,
    carregando: cadastrarMutation.isPending,
  }
}
