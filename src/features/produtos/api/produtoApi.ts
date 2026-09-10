import { api } from "@/shared/lib/api.config"

export async function cadastrarProduto(data: FormData): Promise<void> {
  await api.post("/produtos", data)
}
