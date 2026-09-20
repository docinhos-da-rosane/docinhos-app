import z from "zod"
import { porcaoSchema, porcaoValoresPadrao } from "./produto.porcao.schema"
import { produtoImagemSchema } from "./produto.imagem.schema"

const VALOR_OBRIGATORIO = 1
const NOME_MAXIMO = 100
const DESCRICAO_MAXIMA = 500

export const produtoSchema = z.object({
  nome: z
    .string()
    .min(VALOR_OBRIGATORIO, "O nome do produto é obrigatório")
    .max(
      NOME_MAXIMO,
      `O nome do produto deve possuir no máximo ${NOME_MAXIMO} caracteres`
    ),
  descricao: z
    .string()
    .min(VALOR_OBRIGATORIO, "A descrição do produto é obrigatória")
    .max(
      DESCRICAO_MAXIMA,
      `A descrição do produto deve possuir no máximo ${DESCRICAO_MAXIMA} caracteres`
    ),
  categoriaId: z
    .string()
    .min(VALOR_OBRIGATORIO, "A categoria do produto é obrigatória"),
  imagem: produtoImagemSchema,
  porcoes: z
    .array(porcaoSchema)
    .min(VALOR_OBRIGATORIO, "O produto deve ter pelo menos uma porção"),
})

export type ProdutoFormData = z.input<typeof produtoSchema>

export const produtoValoresPadrao: ProdutoFormData = {
  nome: "",
  descricao: "",
  categoriaId: "",
  imagem: undefined,
  porcoes: [porcaoValoresPadrao],
}
