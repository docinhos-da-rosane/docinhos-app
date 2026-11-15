import { Link } from "react-router-dom"
import { CustomIcon } from "../icon/CustomIcon"

interface LogoProps {
  rota: string
  descricao: string
  icon?: React.ReactNode
}

export function Logo({ icon, rota, descricao }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Link to={rota}>
        <CustomIcon icone={icon} />
      </Link>
      <div>
        <h1 className="text-lg font-bold">
          Docinhos da <span className="text-primary italic">Rosane</span>
        </h1>
        <p className="text-[10px] text-muted-foreground uppercase [word-spacing:0.25em]">
          {descricao}
        </p>
      </div>
    </div>
  )
}
