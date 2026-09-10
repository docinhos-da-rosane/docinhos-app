import {
  CustomButton,
  FormInput,
  FormSelect,
  FormTextarea,
  Painel,
} from "@/shared/components"
import {
  produtoSchema,
  produtoValoresPadrao,
  type ProdutoFormData,
} from "../schemas/produto.schema"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Opcao } from "@/shared/models/opcao.types"
import { ProdutoFormPorcoes } from "./ProdutoFormPorcoes"
import { useNavigate } from "react-router-dom"

interface ProdutoFormProps {
  onSubmit: (dados: ProdutoFormData) => void
  atualizar?: boolean
  categoriasOpcoes: Opcao[]
  carregando: boolean
  rotaCancelar?: string
}

export function ProdutoForm({
  onSubmit,
  atualizar = false,
  categoriasOpcoes,
  carregando,
  rotaCancelar = "/",
}: ProdutoFormProps) {
  const navigate = useNavigate()

  const methods = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: produtoValoresPadrao,
  })

  function onCancelar() {
    methods.reset()
    navigate(rotaCancelar, { replace: true })
  }

  return (
    <FormProvider {...methods}>
      <form
        className="w-full lg:w-2xl"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <fieldset disabled={carregando} className="flex flex-col gap-6">
          <Painel>
            <h2 className="mb-4 text-xl font-bold lg:text-2xl">
              Informações do produto
            </h2>

            <div className="flex flex-col gap-2">
              <FormInput
                label="Nome do produto"
                name="nome"
                type="text"
                placeholder="Digite o nome do produto"
                maxLength={100}
                required
              />

              <FormSelect
                label="Categoria"
                name="categoriaId"
                opcoes={categoriasOpcoes}
                placeholder="Selecione a categoria"
                required
              />

              <FormTextarea
                label="Descrição"
                name="descricao"
                placeholder="Conte um pouco sobre este docinho."
                maxLength={500}
                required
              />
            </div>
          </Painel>
          <ProdutoFormPorcoes />

          <Painel className="flex flex-col-reverse gap-4 lg:flex-row">
            <CustomButton type="button" variant="danger" onClick={onCancelar}>
              Cancelar
            </CustomButton>
            <CustomButton
              type="submit"
              disabled={
                methods.formState.isSubmitting || !methods.formState.isValid
              }
              variant="primary"
              loading={carregando}
            >
              {atualizar ? "Atualizar Produto" : "Cadastrar Produto"}
            </CustomButton>
          </Painel>
        </fieldset>
      </form>
    </FormProvider>
  )
}
