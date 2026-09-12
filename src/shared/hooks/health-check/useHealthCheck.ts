import { apiProtegida } from "@/shared/lib/api.config"
import { useQuery } from "@tanstack/react-query"

interface HealthCheckResponse {
  status: "UP" | "DOWN"
}

export function useHealthCheck() {
  return useQuery<HealthCheckResponse>({
    queryKey: ["health-check"],
    queryFn: async () => {
      const response =
        await apiProtegida.get<HealthCheckResponse>("/actuator/health")
      return response.data
    },
  })
}
