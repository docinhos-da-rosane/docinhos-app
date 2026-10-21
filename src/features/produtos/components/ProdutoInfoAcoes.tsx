import { CustomButton } from "@/shared/components/button/CustomButton"
import { Painel } from "@/shared/components/layout/painel/Painel"

interface ProdutoInfoAcoesProps {
  disponivel: boolean
}

export function ProdutoInfoAcoes({ disponivel }: ProdutoInfoAcoesProps) {
  return (
    <Painel className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2">
      <CustomButton className="px-5 py-3 text-sm">Editar produto</CustomButton>
      <CustomButton
        variant="outline-secondary"
        type="button"
        className="px-5 py-3 text-sm"
      >
        {disponivel ? "Marcar como indisponível" : "Marcar como disponível"}
      </CustomButton>
      <CustomButton variant="danger" className="px-5 py-3 text-sm">
        Excluir produto
      </CustomButton>
    </Painel>
  )
}
