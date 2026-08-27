import { z } from "zod"

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .max(100, "O e-mail deve possuir no máximo 100 caracteres")
    .pipe(z.email("O e-mail deve ser válido")),

  senha: z
    .string()
    .min(1, "A senha é obrigatória")
    .max(100, "A senha deve possuir no máximo 100 caracteres"),
})

export type AuthFormData = z.infer<typeof authSchema>

export const authValoresPadrao: AuthFormData = {
  email: "",
  senha: "",
}
