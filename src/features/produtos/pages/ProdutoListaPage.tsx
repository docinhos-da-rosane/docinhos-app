import { AdminContainer, CustomButton } from "@/shared/components"
import { HealthCheck } from "@/shared/components/health-check/HealthCheck"
import { ROTAS_COMPLETAS } from "@/shared/constants/routes"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ProdutoListaPage() {
  const navigate = useNavigate()

  function navegarParaCadastro() {
    navigate(ROTAS_COMPLETAS.ADMIN.PRODUTOS_CADASTRO)
  }

  return (
    <AdminContainer
      titulo="Produtos"
      subtitulo="Consulte e atualize os produtos do catálogo."
      acoes={
        <CustomButton
          onClick={navegarParaCadastro}
          className="text-md lg:px-6 lg:text-lg"
          icone={<Plus strokeWidth={2.5} />}
        >
          Cadastrar Produto
        </CustomButton>
      }
    >
      <HealthCheck />
    </AdminContainer>
  )
}
