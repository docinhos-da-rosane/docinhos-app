import { z } from "zod"

export const TAMANHO_MAXIMO_IMAGEM = 10 * 1024 * 1024

export const TIPOS_IMAGEM_PERMITIDOS = ["image/jpeg", "image/png"]

export const produtoImagemSchema = z
  .custom<File | undefined>()
  .refine((arquivo) => arquivo instanceof File, {
    message: "Adicione uma foto do produto.",
  })
  .refine(
    (arquivo) => arquivo && TIPOS_IMAGEM_PERMITIDOS.includes(arquivo.type),
    "Selecione uma imagem JPG, JPEG ou PNG."
  )
  .refine(
    (arquivo) => arquivo && arquivo.size <= TAMANHO_MAXIMO_IMAGEM,
    "A foto deve ter no máximo 10 MB."
  )
