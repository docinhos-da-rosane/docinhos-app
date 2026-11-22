import { HeartCrack } from "lucide-react"

export function CatalogoListaVazia() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-5 px-5 py-12 text-center">
      <HeartCrack
        className="size-12 text-muted-foreground"
        strokeWidth={1.25}
      />
      <div>
        <h2 className="text-xl font-bold">Nenhum docinho encontrado</h2>
        <p className="text-muted-foreground">
          Ainda não há produtos para exibir no catálogo.
        </p>
      </div>
    </div>
  )
}
