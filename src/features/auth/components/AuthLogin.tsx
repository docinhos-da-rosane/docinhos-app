import { CustomButton, Painel } from "@/shared/components"
import { AuthIcon } from "./AuthIcon"
import { Link } from "react-router-dom"

export function AuthLogin() {
  return (
    <Painel className="md:px-12 md:py-10">
      <header className="flex flex-col items-center justify-center gap-5">
        <AuthIcon />
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-[10px] text-muted-foreground uppercase">
            Docinhos da Rosane
          </span>
          <h1 className="text-3xl font-bold">
            Área <span className="text-primary italic">Administrativa</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre para gerenciar os produtos do catálogo.
          </p>
        </div>
      </header>
      <form className="my-8">
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            className="w-full rounded-md border-2 border-border p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            className="w-full rounded-md border-2 border-border p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <CustomButton type="submit" variant="primary" className="mt-10">
          Entrar
        </CustomButton>
      </form>

      <footer className="flex flex-col items-center justify-center gap-2">
        <Link
          to="/"
          className="text-sm text-muted-foreground underline hover:text-primary"
        >
          Voltar para o site
        </Link>
      </footer>
    </Painel>
  )
}
