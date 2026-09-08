import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface VoltarButtonProps {
  rota: string
  texto?: string
  className?: string
}

export function VoltarButton({
  rota,
  texto = "Voltar",
  className,
}: VoltarButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(rota, { replace: true })}
      className={`flex cursor-pointer items-center gap-1 text-sm text-muted-foreground ${className} `}
    >
      <ChevronLeft size={18} />
      {texto}
    </button>
  )
}
