import { cn } from "@/shared/lib/utils"
import type { ComponentProps } from "react"

type PainelProps = ComponentProps<"section">

export function Painel({ className, ...props }: PainelProps) {
  return (
    <section
      className={cn(
        "m-5 max-h-fit w-full rounded-2xl border-2 border-border bg-card p-10 shadow-sm",
        className
      )}
      {...props}
    />
  )
}
