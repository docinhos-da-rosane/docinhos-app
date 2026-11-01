import {
  CustomButton,
  FormInput,
  FormSelect,
  FormTextarea,
  Painel,
} from "@/shared/components"
import { type ProdutoFormValues } from "../schemas/produto.schema"
import {
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form"
import type { Opcao } from "@/shared/models/opcao.types"
import { ProdutoFormPorcoes } from "./ProdutoFormPorcoes"
import { ProdutoFormImagem } from "./ProdutoFormImagem"

interface ProdutoFormProps<T extends ProdutoFormValues> {
  onSubmit: SubmitHandler<T>
  atualizar?: boolean
  categoriasOpcoes: Opcao[]
  carregando: boolean
  rotaCancelar?: string
  textoAcao?: string
  imagemUrl?: string
  methods: UseFormReturn<T>
}

export function ProdutoForm<T extends ProdutoFormValues>({
  onSubmit,
  categoriasOpcoes,
  carregando,
  rotaCancelar = "/",
  textoAcao = "Cadastrar Produto",
  imagemUrl,
  methods,
}: ProdutoFormProps<T>) {
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
              <FormInput<ProdutoFormValues>
                label="Nome do produto"
                name="nome"
                type="text"
                placeholder="Digite o nome do produto"
                maxLength={100}
                required
              />

              <FormSelect<ProdutoFormValues>
                label="Categoria"
                name="categoriaId"
                opcoes={categoriasOpcoes}
                placeholder="Selecione a categoria"
                required
              />

              <FormTextarea<ProdutoFormValues>
                label="Descrição"
                name="descricao"
                placeholder="Conte um pouco sobre este docinho."
                maxLength={500}
                required
              />
            </div>
          </Painel>
          <ProdutoFormImagem desativar={carregando} imagemUrl={imagemUrl} />
          <ProdutoFormPorcoes />

          <Painel className="flex flex-col-reverse gap-4 lg:flex-row">
            <CustomButton
              type="button"
              variant="danger"
              rotaNavegar={rotaCancelar}
            >
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
              {textoAcao}
            </CustomButton>
          </Painel>
        </fieldset>
      </form>
    </FormProvider>
  )
}
