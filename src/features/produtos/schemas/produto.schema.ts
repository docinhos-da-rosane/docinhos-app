import z from "zod"

const VALOR_OBRIGATORIO = 1
const NOME_MAXIMO = 100
const DESCRICAO_MAXIMA = 500
const QUANTIDADE_MAXIMA = 999
const PRECO_MAXIMO = 9999.99

const quantidadeSchema = z
  .string()
  .min(VALOR_OBRIGATORIO, "A quantidade é obrigatória")
  .regex(/^\d+$/, "A quantidade é inválida")
  .refine((valor) => Number(valor) > 0, {
    message: "A quantidade deve ser maior que zero",
  })
  .refine((valor) => Number(valor) <= QUANTIDADE_MAXIMA, {
    message: `A quantidade deve ser no máximo ${QUANTIDADE_MAXIMA}`,
  })

const precoSchema = z
  .string()
  .min(VALOR_OBRIGATORIO, "O preço é obrigatório")
  .regex(/^\d+([.,]\d{1,2})?$/, "O preço é inválido")
  .refine((valor) => Number(valor.replace(",", ".")) > 0, {
    message: "O preço deve ser maior que zero",
  })
  .refine((valor) => Number(valor.replace(",", ".")) <= PRECO_MAXIMO, {
    message: `O preço deve ser no máximo R$ ${PRECO_MAXIMO.toFixed(2).replace(".", ",")}`,
  })

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
  porcoes: z
    .array(
      z.object({
        quantidade: quantidadeSchema,
        preco: precoSchema,
      })
    )
    .min(VALOR_OBRIGATORIO, "O produto deve ter pelo menos uma porção"),
})

export type ProdutoFormData = z.infer<typeof produtoSchema>

export const produtoValoresPadrao: ProdutoFormData = {
  nome: "",
  descricao: "",
  categoriaId: "",
  porcoes: [
    {
      quantidade: "",
      preco: "",
    },
  ],
}
