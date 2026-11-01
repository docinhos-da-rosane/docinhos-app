import {
  produtoSchema,
  produtoValoresPadrao,
  type ProdutoFormData,
} from "../schemas/produto.schema"
import { useCadastrarProduto } from "../hooks/useCadastrarProduto.ts"
import { toCriarFormData } from "../mapper/produto.mapper"
import { obterErro } from "@/shared/errors/errorService"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { useForm, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface UseCadastroViewModelResult {
  cadastrar(dados: ProdutoFormData): Promise<void>
  carregando: boolean
  methods: UseFormReturn<ProdutoFormData>
}

export function useCadastroViewModel(): UseCadastroViewModelResult {
  const navigate = useNavigate()
  const cadastrarMutation = useCadastrarProduto()

  const methods = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: produtoValoresPadrao,
  })

  async function cadastrar(dados: ProdutoFormData) {
    try {
      const request = toCriarFormData(dados)
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
    methods,
    carregando: cadastrarMutation.isPending,
  }
}
