import { CircleX } from "lucide-react"

interface InlineErrorProps {
  mensagem?: string
}

export function InlineError({ mensagem }: InlineErrorProps) {
  return (
    <div
      aria-live="assertive"
      className="flex min-h-80 flex-col items-center justify-center gap-3 px-5 py-12 text-center text-danger"
      role="alert"
    >
      <CircleX aria-hidden="true" className="size-8" />
      <p className="max-w-lg text-base font-medium">
        {mensagem || "Ocorreu um erro. Tente novamente."}
      </p>
    </div>
  )
}
