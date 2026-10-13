import { LoaderCircle } from "lucide-react"
interface InlineLoadingProps {
  mensagem?: string
}

export function InlineLoading({ mensagem }: InlineLoadingProps) {
  return (
    <div
      className="flex min-h-80 flex-col items-center justify-center gap-3 text-muted-foreground"
      role="status"
    >
      <LoaderCircle aria-hidden="true" className="size-8 animate-spin" />
      <span>{mensagem || "Carregando..."}</span>
    </div>
  )
}
