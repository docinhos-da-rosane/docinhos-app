import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FormProvider, useForm } from "react-hook-form"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ProdutoFormImagem } from "./ProdutoFormImagem"
import {
  produtoValoresPadrao,
  type ProdutoFormData,
} from "../schemas/produto.schema"
import { TAMANHO_MAXIMO_IMAGEM } from "../schemas/produto.imagem.schema"

function renderForm() {
  function Wrapper() {
    const methods = useForm<ProdutoFormData>({
      defaultValues: produtoValoresPadrao,
    })

    return (
      <FormProvider {...methods}>
        <ProdutoFormImagem />
      </FormProvider>
    )
  }

  return render(<Wrapper />)
}

describe(ProdutoFormImagem.name, () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("deve renderizar o título, a prévia e o campo de imagem", () => {
    renderForm()

    expect(screen.getByText("Foto do Produto")).toBeInTheDocument()
    expect(
      screen.getByText("Pré-visualização da foto do produto")
    ).toBeInTheDocument()
    expect(screen.getByText("Selecionar foto *")).toBeInTheDocument()
  })

  it("deve alterar o texto do campo quando uma imagem válida for selecionada", async () => {
    const user = userEvent.setup()
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn().mockReturnValue("blob:test"),
      revokeObjectURL: vi.fn(),
    })

    renderForm()

    const arquivo = new File(["imagem"], "produto.png", {
      type: "image/png",
    })

    await user.upload(screen.getByLabelText("Selecionar foto *"), arquivo)

    expect(await screen.findByText("Alterar foto")).toBeInTheDocument()
    expect(
      await screen.findByRole("img", {
        name: "Pré-visualização da foto do produto",
      })
    ).toBeInTheDocument()
  })

  it("deve manter a prévia vazia para uma imagem com tipo inválido", async () => {
    const user = userEvent.setup()
    renderForm()

    const arquivo = new File(["arquivo"], "produto.gif", {
      type: "image/gif",
    })

    await user.upload(screen.getByLabelText("Selecionar foto *"), arquivo)

    await waitFor(() => {
      expect(
        screen.getByText("Pré-visualização da foto do produto")
      ).toBeInTheDocument()
    })

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(screen.getByText("Selecionar foto *")).toBeInTheDocument()
  })

  it("deve manter a prévia vazia quando a imagem ultrapassar o tamanho máximo", async () => {
    const user = userEvent.setup()
    renderForm()

    const arquivoGrande = new File(
      [new Uint8Array(TAMANHO_MAXIMO_IMAGEM + 1)],
      "produto.png",
      { type: "image/png" }
    )

    await user.upload(screen.getByLabelText("Selecionar foto *"), arquivoGrande)

    expect(
      await screen.findByText("Pré-visualização da foto do produto")
    ).toBeInTheDocument()

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(screen.getByText("Selecionar foto *")).toBeInTheDocument()
  })
})
