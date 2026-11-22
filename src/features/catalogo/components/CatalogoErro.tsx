import { Link } from "react-router-dom"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { OctagonX } from "lucide-react"

interface CatalogoErroProps {
  titulo: string
  descricao: string
}

export function CatalogoErro({ titulo, descricao }: CatalogoErroProps) {
  return (
    <div
      role="alert"
      className="flex min-h-80 flex-col items-center justify-center gap-8 px-5 py-12 text-center"
    >
      <div className="flex flex-col items-center gap-2">
        <OctagonX
          className="text-muted-foreground"
          strokeWidth={1.25}
          size={38}
        />
        <h2 className="text-xl font-bold">{titulo}</h2>
        <p className="max-w-prose text-muted-foreground">{descricao}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to={ROTAS_COMPLETAS.HOME}
          className="font-medium text-primary underline hover:text-primary/80"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
