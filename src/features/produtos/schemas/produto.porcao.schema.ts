import z from "zod"

const VALOR_OBRIGATORIO = 1
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

export const porcaoSchema = z.object({
  quantidade: quantidadeSchema,
  preco: precoSchema,
})

export type ProdutoPorcaoFormData = z.infer<typeof porcaoSchema>

export const porcaoValoresPadrao: ProdutoPorcaoFormData = {
  quantidade: "",
  preco: "",
}
