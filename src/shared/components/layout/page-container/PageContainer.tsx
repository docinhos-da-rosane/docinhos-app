import { cn } from "@/shared/lib/utils"
import type { ComponentProps, ReactNode } from "react"
import { VoltarButton } from "../../button/VoltarButton"

interface PageContainerProps extends ComponentProps<"section"> {
  titulo?: string
  tituloPersonalizado?: ReactNode
  subtitulo: string
  rotaVoltar?: string
  textoVoltar?: string
  acoes?: ReactNode
}

export function PageContainer({
  titulo,
  tituloPersonalizado,
  subtitulo,
  rotaVoltar,
  textoVoltar,
  className,
  children,
  acoes,
  ...props
}: PageContainerProps) {
  return (
    <section {...props} className={cn("min-h-screen", className)}>
      <header className="flex justify-center border-b bg-white p-4 lg:p-6">
        <div className="flex w-full flex-col gap-4 lg:max-w-7xl">
          <div>
            {rotaVoltar && (
              <VoltarButton rotaVoltar={rotaVoltar}>{textoVoltar}</VoltarButton>
            )}
          </div>
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              {tituloPersonalizado || (
                <h1 className="mb-1 text-3xl font-bold lg:mb-2 lg:text-4xl">
                  {titulo}
                </h1>
              )}
              <p className="text-muted-foreground">{subtitulo}</p>
            </div>
            {acoes && <div className="flex">{acoes}</div>}
          </div>
        </div>
      </header>
      <div className="flex justify-center px-4 py-8 lg:px-6 lg:py-10">
        {children}
      </div>
    </section>
  )
}
