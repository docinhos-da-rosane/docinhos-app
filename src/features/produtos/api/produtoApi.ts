import { apiProtegida } from "@/shared/lib/api.config"
import type {
  PageResponse,
  ProdutoDetalhadoResponse,
  ProdutoResumoResponse,
} from "../models/produto.types"

export const TAMANHO_PAGINA_PRODUTOS = 6
const URL_ADMIN_PRODUTO = "/admin/produtos"

export async function buscarProdutos(
  page: number
): Promise<PageResponse<ProdutoResumoResponse>> {
  return await apiProtegida
    .get<PageResponse<ProdutoResumoResponse>>(`${URL_ADMIN_PRODUTO}`, {
      params: { page, size: TAMANHO_PAGINA_PRODUTOS },
    })
    .then((response) => response.data)
}

export async function buscarProduto(
  id: string
): Promise<ProdutoDetalhadoResponse> {
  return await apiProtegida
    .get<ProdutoDetalhadoResponse>(`${URL_ADMIN_PRODUTO}/${id}`)
    .then((response) => response.data)
}

export async function cadastrarProduto(data: FormData): Promise<void> {
  await apiProtegida.post(`${URL_ADMIN_PRODUTO}`, data)
}

export async function atualizarProduto(
  id: string,
  data: FormData
): Promise<void> {
  await apiProtegida.put(`${URL_ADMIN_PRODUTO}/${id}`, data)
}

export async function alterarDisponibilidadeProduto(
  id: string,
  disponivel: boolean
): Promise<void> {
  await apiProtegida.patch(`${URL_ADMIN_PRODUTO}/${id}/disponibilidade`, {
    disponivel,
  })
}

export async function excluirProduto(id: string): Promise<void> {
  await apiProtegida.delete(`${URL_ADMIN_PRODUTO}/${id}`)
}
