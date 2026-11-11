import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { CustomButton } from "../button/CustomButton"

interface ConfirmarDialogProps {
  aberto: boolean
  onOpenChange: (aberto: boolean) => void
  texto: string
  onCancelar: () => void
  onConfirmar: () => void
  carregando?: boolean
}

export function ConfirmarDialog({
  aberto,
  onOpenChange,
  texto,
  onCancelar,
  onConfirmar,
  carregando = false,
}: ConfirmarDialogProps) {
  function alterarAbertura(novoEstado: boolean) {
    if (carregando && !novoEstado) return
    onOpenChange(novoEstado)
  }

  function cancelar() {
    if (carregando) return
    onCancelar()
    onOpenChange(false)
  }

  function confirmar() {
    if (carregando) return
    onConfirmar()
  }

  return (
    <Dialog open={aberto} onOpenChange={alterarAbertura}>
      <DialogContent showCloseButton={!carregando}>
        <DialogHeader className="flex flex-col gap-4 px-4 py-2">
          <DialogTitle className="text-lg font-bold md:text-2xl">
            Confirmação
          </DialogTitle>
          <DialogDescription className="text-md md:text-[16px]">
            {texto}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="border-0 bg-transparent px-6">
          <CustomButton
            type="button"
            variant="outline-secondary"
            onClick={cancelar}
            disabled={carregando}
            className="text-md p-2 font-semibold tracking-wide md:px-6 md:text-lg"
          >
            Cancelar
          </CustomButton>
          <CustomButton
            onClick={confirmar}
            loading={carregando}
            className="text-md p-2 font-semibold tracking-wide md:px-6 md:text-lg"
          >
            Confirmar
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
