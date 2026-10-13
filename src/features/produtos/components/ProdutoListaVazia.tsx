import { CustomButton } from "@/shared/components"
import { Dessert } from "lucide-react"

interface ProdutoListaVaziaProps {
  onCadastrarProduto: () => void
}

export function ProdutoListaVazia({
  onCadastrarProduto,
}: ProdutoListaVaziaProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 px-5 py-12 text-center">
      <Dessert
        aria-hidden="true"
        className="size-12 text-muted-foreground"
        strokeWidth={1.25}
      />
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-foreground">
          Nenhum produto cadastrado
        </h2>
        <p className="max-w-lg text-sm text-muted-foreground">
          Cadastre o primeiro produto para começar a montar o catálogo.
        </p>
      </div>
      <CustomButton
        className="w-auto px-6 py-3 text-base"
        onClick={onCadastrarProduto}
      >
        Cadastrar produto
      </CustomButton>
    </div>
  )
}
