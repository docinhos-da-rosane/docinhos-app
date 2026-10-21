import { useParams } from "react-router-dom"

import { AdminContainer, PageLoading } from "@/shared/components"
import { ProdutoInfo } from "../components/ProdutoInfo"
import { useProdutoViewModel } from "../view-model/useProdutoViewModel"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"

export function ProdutoDetalhesPage() {
  const { id } = useParams()
  const { produto, carregando } = useProdutoViewModel(id)

  return (
    <>
      {carregando && <PageLoading />}

      <AdminContainer
        titulo={produto.nome}
        subtitulo="Consulte as informações completas do produto."
        rotaVoltar={ROTAS_COMPLETAS.ADMIN.PRODUTOS}
        textoVoltar="Voltar para produtos"
      >
        <div className="w-full max-w-7xl">
          <ProdutoInfo produto={produto} />
        </div>
      </AdminContainer>
    </>
  )
}
