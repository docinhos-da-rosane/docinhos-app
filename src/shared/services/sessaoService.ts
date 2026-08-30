import { toast } from "sonner"
import { removerToken } from "./tokenService"

type SessaoHandler = () => void

let sessaoExpiradaHandler: SessaoHandler | null = null

export function setSessaoExpiradaHandler(handler: SessaoHandler) {
  sessaoExpiradaHandler = handler
}

export function limpaSessaoENotifica() {
  removerToken()
  toast.warning("Sua sessão expirou. Entre novamente.")
  sessaoExpiradaHandler?.()
}
