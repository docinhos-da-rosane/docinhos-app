import { cn } from "cn"

interface ProdutoDisponibilidadeProps {
  disponivel: boolean
}

export function ProdutoDisponibilidade({
  disponivel,
}: ProdutoDisponibilidadeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border p-1 text-sm font-medium",
        disponivel
          ? "border-success/40 bg-success-light text-success"
          : "border-border bg-muted text-muted-foreground"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full md:ml-3",
          disponivel ? "bg-current" : "border border-current"
        )}
      />
      <span className="sr-only md:not-sr-only md:mr-3">
        {disponivel ? "Disponível" : "Indisponível"}
      </span>
    </div>
  )
}
