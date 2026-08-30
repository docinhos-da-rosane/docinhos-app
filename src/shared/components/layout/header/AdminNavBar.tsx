import { useLogoutViewModel } from "@/features/auth"
import { AdminIcon, CustomButton } from "@/shared/components"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { LogOut } from "lucide-react"
import { Link } from "react-router-dom"

export function AdminNavBar() {
  const { sair } = useLogoutViewModel()

  return (
    <header className="flex justify-center border-b bg-white p-4">
      <div className="flex w-full items-center justify-between gap-2 lg:max-w-7xl">
        <div className="flex items-center gap-3">
          <Link to={ROTAS_COMPLETAS.ADMIN.PRODUTOS}>
            <AdminIcon size={22} />
          </Link>
          <div>
            <h1 className="text-lg font-bold">
              Docinhos da <span className="text-primary italic">Rosane</span>
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase">
              área dministrativa
            </p>
          </div>
        </div>

        <CustomButton
          onClick={sair}
          icone={<LogOut />}
          variant="outline-secondary"
          className="text-md w-fit px-4 py-2 font-normal sm:px-5"
        >
          Sair
        </CustomButton>
      </div>
    </header>
  )
}
