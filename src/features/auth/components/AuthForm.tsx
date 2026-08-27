import { FormProvider, useForm } from "react-hook-form"
import {
  authSchema,
  authValoresPadrao,
  type AuthFormData,
} from "../schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CustomButton, FormInput } from "@/shared/components"

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void
  carregando: boolean
}

export function AuthForm({ onSubmit, carregando }: AuthFormProps) {
  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: authValoresPadrao,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Digite seu email"
        />

        <FormInput
          label="Senha"
          name="senha"
          type="password"
          placeholder="Digite sua senha"
        />

        <CustomButton
          type="submit"
          disabled={
            methods.formState.isSubmitting || !methods.formState.isValid
          }
          variant="primary"
          loading={carregando}
          className="mt-10"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </CustomButton>
      </form>
    </FormProvider>
  )
}
