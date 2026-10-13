import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProdutoPaginacaoProps {
  paginaAnteriorDesabilitada: boolean
  proximaPaginaDesabilitada: boolean
  onNavegarParaPaginaAnterior: () => void
  onNavegarParaProximaPagina: () => void
}

export function ProdutoPaginacao({
  paginaAnteriorDesabilitada,
  proximaPaginaDesabilitada,
  onNavegarParaPaginaAnterior,
  onNavegarParaProximaPagina,
}: ProdutoPaginacaoProps) {
  return (
    <nav
      aria-label="Paginação de produtos"
      className="flex items-center justify-center gap-4 pt-5"
    >
      <button
        aria-label="Página anterior"
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
        disabled={paginaAnteriorDesabilitada}
        onClick={onNavegarParaPaginaAnterior}
        type="button"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>
      <button
        aria-label="Próxima página"
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
        disabled={proximaPaginaDesabilitada}
        onClick={onNavegarParaProximaPagina}
        type="button"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </nav>
  )
}
