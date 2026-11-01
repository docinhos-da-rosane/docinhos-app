import { CustomButton } from "@/shared/components/button/CustomButton"
import { Painel } from "@/shared/components/layout/painel/Painel"
import type { ProdutoDetalhadoResponse } from "../models/produto.types"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"

interface ProdutoInfoAcoesProps {
  produto: ProdutoDetalhadoResponse
}

export function ProdutoInfoAcoes({ produto }: ProdutoInfoAcoesProps) {
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
      >
        {produto.disponivel
          ? "Marcar como indisponível"
          : "Marcar como disponível"}
      </CustomButton>
      <CustomButton variant="danger" className="px-5 py-3 text-sm">
        Excluir produto
      </CustomButton>
    </Painel>
  )
}
