import type { Opcao } from "@/shared/models/opcao.types"

interface UseCadastroViewModelResult {
  categoriasOpcoes: Opcao[]
}

export function useCadastroViewModel(): UseCadastroViewModelResult {
  const categoriasOpcoes: Opcao[] = [
    { valor: "bolo", label: "Bolo" },
    { valor: "torta", label: "Torta" },
    { valor: "docinho", label: "Docinho" },
    { valor: "salgado", label: "Salgado" },
  ]

  return {
    categoriasOpcoes,
  }
}
