import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { createMemoryRouterWrapper } from "@/test/createMemoryRouterWrapper"
import { ConfirmarDialog } from "./ConfirmarDialog"

function renderDialog(carregando = false) {
  const onCancelar = vi.fn()
  const onConfirmar = vi.fn()

  function ConfirmarDialogMock() {
    const [aberto, setAberto] = useState(true)

    return (
      <ConfirmarDialog
        aberto={aberto}
        onOpenChange={setAberto}
        texto="Deseja continuar?"
        onCancelar={onCancelar}
        onConfirmar={onConfirmar}
        carregando={carregando}
      />
    )
  }

  const Wrapper = createMemoryRouterWrapper()
  render(
    <Wrapper>
      <ConfirmarDialogMock />
    </Wrapper>
  )
  return { onCancelar, onConfirmar }
}

describe(ConfirmarDialog.name, () => {
  it("deve exibir a mensagem e executa as ações de confirmar e cancelar", async () => {
    const user = userEvent.setup()
    const { onCancelar, onConfirmar } = renderDialog()

    expect(
      screen.getByRole("dialog", { name: "Confirmação" })
    ).toHaveTextContent("Deseja continuar?")

    await user.click(screen.getByRole("button", { name: "Confirmar" }))
    expect(onConfirmar).toHaveBeenCalledOnce()
    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Cancelar" }))
    expect(onCancelar).toHaveBeenCalledOnce()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("dever manter o Dialog aberto e bloqueiar as ações durante o processamento", async () => {
    const user = userEvent.setup()
    const { onCancelar, onConfirmar } = renderDialog(true)
    const dialog = screen.getByRole("dialog", { name: "Confirmação" })

    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeDisabled()

    fireEvent.keyDown(dialog, { key: "Escape" })
    await user.click(screen.getByRole("button", { name: "Cancelar" }))
    await user.click(screen.getByRole("button", { name: "Confirmar" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(onCancelar).not.toHaveBeenCalled()
    expect(onConfirmar).not.toHaveBeenCalled()
  })
})
