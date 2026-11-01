import { AdminContainer, PageLoading } from "@/shared/components"
import { useOpcoesViewModel } from "../view-model/useOpcoesViewModel"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { ProdutoForm } from "../components/ProdutoForm"
import { useParams } from "react-router-dom"
import { useEdicaoViewModel } from "../view-model/useEdicaoViewModel"

export function ProdutoEdicaoPage() {
  const { id } = useParams()
  const {
    methods,
    imagemUrl,
    carregando: carregandoProduto,
    carregandoEdicao,
    atualizar,
  } = useEdicaoViewModel(id)
  const { categoriasOpcoes, carregando: carregandoCategorias } =
    useOpcoesViewModel()

  const carregandoPagina = carregandoCategorias || carregandoProduto

  return (
    <>
      {carregandoPagina ? <PageLoading /> : null}

      <AdminContainer
        titulo="Editar Produto"
        subtitulo="Atualize as informações do produto"
        rotaVoltar={ROTAS_COMPLETAS.ADMIN.PRODUTO_DETALHES(id!)}
        textoVoltar="Voltar para detalhes do produto"
      >
        <ProdutoForm
          categoriasOpcoes={categoriasOpcoes}
          carregando={carregandoEdicao || carregandoPagina}
          rotaCancelar={ROTAS_COMPLETAS.ADMIN.PRODUTO_DETALHES(id!)}
          textoAcao="Editar Produto"
          methods={methods}
          imagemUrl={imagemUrl}
          onSubmit={atualizar}
        />
      </AdminContainer>
    </>
  )
}
