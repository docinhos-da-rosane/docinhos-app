import { AdminContainer, PageLoading } from "@/shared/components"
import { ProdutoForm } from "../components/ProdutoForm"
import { useCadastroViewModel } from "../view-model/useCadastroViewModel"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { useOpcoesViewModel } from "../view-model/useOpcoesViewModel"

export function ProdutoCadastroPage() {
  const { cadastrar, carregando: cadastrando } = useCadastroViewModel()
  const { categoriasOpcoes, carregando: carregandoCategorias } =
    useOpcoesViewModel()

  return (
    <>
      {carregandoCategorias && <PageLoading />}

      <AdminContainer
        titulo="Cadastrar Produto"
        subtitulo="Preencha as informações do novo produto."
        rotaVoltar={ROTAS_COMPLETAS.ADMIN.PRODUTOS}
        textoVoltar="Voltar para produtos"
      >
        <ProdutoForm
          categoriasOpcoes={categoriasOpcoes}
          carregando={cadastrando || carregandoCategorias}
          rotaCancelar={ROTAS_COMPLETAS.ADMIN.PRODUTOS}
          onSubmit={cadastrar}
        />
      </AdminContainer>
    </>
  )
}
