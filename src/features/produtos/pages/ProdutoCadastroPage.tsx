import { AdminContainer } from "@/shared/components"
import { ProdutoForm } from "../components/ProdutoForm"
import { useCadastroViewModel } from "../view-model/useCadastroViewModel"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"

export function ProdutoCadastroPage() {
  const { categoriasOpcoes } = useCadastroViewModel()

  return (
    <AdminContainer
      titulo="Cadastrar Produto"
      subtitulo="Preencha as informações do novo produto."
      rotaVoltar={ROTAS_COMPLETAS.ADMIN.PRODUTOS}
      textoVoltar="Voltar para produtos"
    >
      <ProdutoForm
        categoriasOpcoes={categoriasOpcoes}
        carregando={false}
        rotaCancelar={ROTAS_COMPLETAS.ADMIN.PRODUTOS}
      />
    </AdminContainer>
  )
}
