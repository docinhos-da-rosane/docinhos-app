import { AuthIcon } from "./AuthIcon"
import { Link } from "react-router-dom"
import { AuthForm } from "./AuthForm"
import { Painel } from "@/shared/components"

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
      <div className="my-8">
        <AuthForm />
      </div>
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
