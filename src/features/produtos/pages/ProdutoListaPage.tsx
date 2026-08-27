import { HealthCheck } from "@/shared/components/health-check/HealthCheck"

export function ProdutoListaPage() {
  return (
    <section>
      <p className="text-red-500">Página de lista de produtos</p>
      <div className="m-10 flex justify-center">
        <HealthCheck />
      </div>
    </section>
  )
}
