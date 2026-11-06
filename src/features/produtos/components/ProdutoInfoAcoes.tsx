import { Painel } from "@/shared/components/layout/painel/Painel"
import type { ProdutoDetalhadoResponse } from "../models/produto.types"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { ConfirmarDialog, CustomButton } from "@/shared/components"
import type { AcaoConfirmarDialog } from "@/shared/models/acao.type"

interface ProdutoInfoAcoesProps {
  produto: ProdutoDetalhadoResponse
  acaoDisponibilidade: AcaoConfirmarDialog
}

export function ProdutoInfoAcoes({
  produto,
  acaoDisponibilidade,
}: ProdutoInfoAcoesProps) {
  return (
    <Painel className="flex min-h-full flex-col gap-4 lg:col-start-1 lg:row-start-2">
      <CustomButton
        className="px-5 py-3 text-sm"
        rotaNavegar={ROTAS_COMPLETAS.ADMIN.PRODUTO_EDICAO(produto.id)}
      >
        Editar produto
      </CustomButton>
      <CustomButton
        variant="outline-secondary"
        type="button"
        className="px-5 py-3 text-sm"
        onClick={acaoDisponibilidade.onAbrir}
      >
        {produto.disponivel
          ? "Marcar como indisponível"
          : "Marcar como disponível"}
      </CustomButton>
      <CustomButton variant="danger" className="px-5 py-3 text-sm">
        Excluir produto
      </CustomButton>
      <ConfirmarDialog
        aberto={acaoDisponibilidade.aberto}
        onOpenChange={(aberto: boolean) => {
          if (!aberto) acaoDisponibilidade.onFechar()
        }}
        texto={acaoDisponibilidade.texto}
        onCancelar={acaoDisponibilidade.onFechar}
        onConfirmar={acaoDisponibilidade.onConfirmar}
        carregando={acaoDisponibilidade.carregando}
      />
    </Painel>
  )
}
