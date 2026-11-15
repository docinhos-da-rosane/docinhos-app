import { useLogoutViewModel } from "@/features/auth"
import { CustomButton } from "@/shared/components"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { LogOut, UserRound } from "lucide-react"
import { Logo } from "../../logo/Logo"

export function AdminNavBar() {
  const { sair } = useLogoutViewModel()

  return (
    <header className="flex justify-center border-b bg-white p-4">
      <div className="flex w-full items-center justify-between gap-3 lg:max-w-7xl">
        <Logo
          rota={ROTAS_COMPLETAS.ADMIN.PRODUTOS}
          descricao="área administrativa"
          icon={<UserRound size={22} color="white" />}
        />

        <CustomButton
          onClick={sair}
          icone={<LogOut size={16} />}
          variant="outline-secondary"
          className="text-md w-fit px-4 py-2 font-normal sm:px-5"
        >
          Sair
        </CustomButton>
      </div>
    </header>
  )
}
