import { ChevronLeft } from "lucide-react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface VoltarButtonProps {
  rotaVoltar: string
  children?: ReactNode
  className?: string
}

export function VoltarButton({
  children,
  className,
  rotaVoltar,
}: VoltarButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(rotaVoltar, { replace: true })}
      className={`flex cursor-pointer items-center gap-1 text-sm text-muted-foreground ${className} `}
    >
      <ChevronLeft size={18} />
      {children ? children : "Voltar"}
    </button>
  )
}
