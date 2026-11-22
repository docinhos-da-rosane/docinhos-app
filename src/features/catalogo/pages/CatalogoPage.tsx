import { PageContainer } from "@/shared/components/layout/page-container/PageContainer"
import { InlineLoading } from "@/shared/components/loading/InlineLoading"
import { CatalogoErro } from "../components/CatalogoErro"
import { CatalogoLista } from "../components/CatalogoLista"
import { CatalogoListaVazia } from "../components/CatalogoListaVazia"
import { useCatalogoViewModel } from "../view-model/useCatalogoViewModel"
import { Paginacao } from "@/shared/components/paginacao/Paginacao"

export function CatalogoPage() {
  const catalogo = useCatalogoViewModel()

  return (
    <PageContainer
      tituloPersonalizado={
        <h1 className="mb-1 text-3xl font-bold lg:mb-2 lg:text-4xl">
          Nossos <span className="text-primary italic">Docinhos</span>
        </h1>
      }
      subtitulo="Encontre o docinho perfeito para adoçar cada momento."
    >
      <div className="w-full max-w-7xl space-y-5">
        {catalogo.carregando ? (
          <InlineLoading mensagem="Carregando docinhos..." />
        ) : catalogo.ocorreuErro ? (
          <CatalogoErro
            titulo="Não conseguimos carregar o catálogo"
            descricao="Tivemos um problema ao buscar os docinhos. Tente novamente em alguns instantes ou volte para a página inicial."
          />
        ) : catalogo.catalogoVazio ? (
          <CatalogoListaVazia />
        ) : (
          <CatalogoLista produtos={catalogo.produtos} />
        )}

        <Paginacao
          paginaAnteriorDesabilitada={catalogo.paginaAnteriorDesabilitada}
          proximaPaginaDesabilitada={catalogo.proximaPaginaDesabilitada}
          onNavegarParaPaginaAnterior={catalogo.navegarParaPaginaAnterior}
          onNavegarParaProximaPagina={catalogo.navegarParaProximaPagina}
        />
      </div>
    </PageContainer>
  )
}
