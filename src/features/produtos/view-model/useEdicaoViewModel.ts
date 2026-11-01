import { useEffect, useMemo } from "react"
import { useBuscaProduto } from "../hooks/useBuscaProduto"
import { obterErro } from "@/shared/errors/errorService"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import {
  produtoSchemaEdicao,
  produtoValoresPadrao,
  type ProdutoFormDataEdicao,
} from "../schemas/produto.schema"
import {
  toCriarFormData,
  toCriarProdutoFormData,
} from "../mapper/produto.mapper"
import { useEditarProduto } from "../hooks/useEditarProduto"
import { useForm, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CodeError } from "@/shared/errors/error.enum"

interface UseEdicaoViewModelResult {
  imagemUrl?: string
  carregando: boolean
  carregandoEdicao: boolean
  methods: UseFormReturn<ProdutoFormDataEdicao>
  atualizar: (dados: ProdutoFormDataEdicao) => Promise<void>
}

export function useEdicaoViewModel(id: string = ""): UseEdicaoViewModelResult {
  const navigate = useNavigate()
  const produtoQuery = useBuscaProduto(id)
  const editarMutation = useEditarProduto()

  const produtoPadraoForm = useMemo(
    () =>
      produtoQuery.data
        ? toCriarProdutoFormData(produtoQuery.data)
        : produtoValoresPadrao,
    [produtoQuery.data]
  )

  const methods = useForm<ProdutoFormDataEdicao>({
    resolver: zodResolver(produtoSchemaEdicao),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: produtoPadraoForm,
  })

  const { reset } = methods

  useEffect(() => {
    reset(produtoPadraoForm)
  }, [produtoPadraoForm, reset])

  useEffect(() => {
    if (!produtoQuery.isError) return

    const erroApp = obterErro(produtoQuery.error)
    toast.error(erroApp.mensagem)

    if (erroApp.codeError == CodeError.NAO_ENCONTRADO) {
      navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS, { replace: true })
    } else {
      navigate(ROTAS_COMPLETAS.ADMIN.PRODUTO_DETALHES(id), { replace: true })
    }
  }, [id, navigate, produtoQuery.error, produtoQuery.isError])

  async function atualizar(dados: ProdutoFormDataEdicao) {
    try {
      const request = toCriarFormData(dados)
      await editarMutation.mutateAsync({ id, data: request })
      toast.success("Produto atualizado com sucesso!")
    } catch (erro: unknown) {
      const erroApp = obterErro(erro)
      toast.error(erroApp.mensagem)
    } finally {
      navigate(ROTAS_COMPLETAS.ADMIN.PRODUTO_DETALHES(id), { replace: true })
    }
  }

  return {
    imagemUrl: produtoQuery.data?.imagemUrl,
    carregando: produtoQuery.isLoading,
    carregandoEdicao: editarMutation.isPending,
    methods,
    atualizar,
  }
}
