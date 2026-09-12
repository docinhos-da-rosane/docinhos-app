import { apiProtegida } from "@/shared/lib/api.config"

export async function cadastrarProduto(data: FormData): Promise<void> {
  await apiProtegida.post("/produtos", data)
}
