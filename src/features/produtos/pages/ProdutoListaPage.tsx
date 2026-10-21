import {
  AdminContainer,
  CustomButton,
  InlineLoading,
  Painel,
} from "@/shared/components"
import { Plus } from "lucide-react"
import { useProdutoListaViewModel } from "../view-model/useProdutoListaViewModel"
import { ProdutoListaTabela } from "../components/ProdutoListaTabela"
import { ProdutoListaVazia } from "../components/ProdutoListaVazia"
import { ProdutoPaginacao } from "../components/ProdutoPaginacao"
import { InlineError } from "@/shared/components/error/InlineError"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"

export function ProdutoListaPage() {
  const {
    produtos,
    possuiProdutos,
    carregando,
    ocorreuErro,
    paginaAnteriorDesabilitada,
    proximaPaginaDesabilitada,
    navegarParaPaginaAnterior,
    navegarParaProximaPagina,
  } = useProdutoListaViewModel()

  return (
    <AdminContainer
      titulo="Produtos"
      subtitulo="Consulte e atualize os produtos do catálogo."
      acoes={
        <CustomButton
          rotaNavegar={ROTAS_COMPLETAS.ADMIN.PRODUTOS_CADASTRO}
          className="text-md lg:w-auto lg:px-6 lg:text-lg"
          icone={<Plus strokeWidth={2.5} />}
        >
          Cadastrar Produto
        </CustomButton>
      }
    >
      <div className="w-full max-w-7xl">
        <Painel className="overflow-hidden p-0">
          {carregando ? (
            <InlineLoading mensagem="Carregando produtos..." />
          ) : ocorreuErro ? (
            <InlineError mensagem="Ocorreu um erro ao carregar os produtos. Tente novamente." />
          ) : possuiProdutos ? (
            <ProdutoListaTabela produtos={produtos} />
          ) : (
            <ProdutoListaVazia
              rotaCadastrarProduto={ROTAS_COMPLETAS.ADMIN.PRODUTOS_CADASTRO}
            />
          )}
        </Painel>

        <ProdutoPaginacao
          paginaAnteriorDesabilitada={paginaAnteriorDesabilitada}
          proximaPaginaDesabilitada={proximaPaginaDesabilitada}
          onNavegarParaPaginaAnterior={navegarParaPaginaAnterior}
          onNavegarParaProximaPagina={navegarParaProximaPagina}
        />
      </div>
    </AdminContainer>
  )
}
