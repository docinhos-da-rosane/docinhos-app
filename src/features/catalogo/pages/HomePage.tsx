import { HealthCheck } from "@/shared/components"

export function HomePage() {
  return (
    <>
      <p className="text-red-500">Página Principal</p>
      <div className="m-10 flex justify-center">
        <HealthCheck />
      </div>
    </>
  )
}
