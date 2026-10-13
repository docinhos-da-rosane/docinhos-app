import { apiProtegida } from "@/shared/lib/api.config"
import type {
  PageResponse,
  ProdutoResumoResponse,
} from "../models/produto.types"

export const TAMANHO_PAGINA_PRODUTOS = 6

export async function buscarProdutos(
  page: number
): Promise<PageResponse<ProdutoResumoResponse>> {
  return await apiProtegida
    .get<PageResponse<ProdutoResumoResponse>>("/produtos", {
      params: { page, size: TAMANHO_PAGINA_PRODUTOS },
    })
    .then((response) => response.data)
}

export async function cadastrarProduto(data: FormData): Promise<void> {
  await apiProtegida.post("/produtos", data)
}
