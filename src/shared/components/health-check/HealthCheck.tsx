import { useHealthCheck } from "@/shared/hooks/health-check/useHealthCheck"
export function HealthCheck() {
  const { data, error, isPending } = useHealthCheck()

  return (
    <div className="flex max-w-3xl flex-col items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-lg font-semibold text-black">
        Teste de Conexão Backend
      </h2>

      {isPending && (
        <div className="w-full rounded-lg bg-blue-100 p-5 text-blue-700">
          <p className="font-semibold">🔄️ Carregando...</p>
        </div>
      )}

      {!isPending && error && (
        <div className="w-full rounded-lg bg-red-100 p-5 text-red-700">
          <p className="font-semibold">❌ Erro na conexão</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {!isPending && data && (
        <div className="w-full space-y-2 rounded-lg bg-green-100 p-5 text-green-700">
          <p className="font-semibold">✅ Backend conectado com sucesso</p>
          <p className="text-sm">
            <strong>Status:</strong> {data.status}
          </p>
        </div>
      )}
    </div>
  )
}
