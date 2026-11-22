import { apiPublica } from "@/shared/lib/api.config"
import type { PageResponse } from "@/shared/models/page.type"
import type { CatalogoProdutoResponse } from "../models/catalogo.produto.types"

export const TAMANHO_PAGINA_CATALOGO = 6
const URL_PRODUTO_PUBLICO = "/publico/produtos"

export async function buscarProdutosPublicos(
  page: number,
  size = TAMANHO_PAGINA_CATALOGO
): Promise<PageResponse<CatalogoProdutoResponse>> {
  return await apiPublica
    .get<PageResponse<CatalogoProdutoResponse>>(URL_PRODUTO_PUBLICO, {
      params: { page, size },
    })
    .then((response) => response.data)
}
